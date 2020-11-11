import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import * as io from 'socket.io-client';

import { Actions } from 'bgpg/api/actions';
import { Events } from 'bgpg/api/events';
import { ErrorResponse } from 'bgpg/model/error-response';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: SocketIOClient.Socket;

  get connected(): boolean {
    return this.socket.connected;
  }

  constructor() {
    const options: SocketIOClient.ConnectOpts = {};
    if (environment.production) {
      options.transports = ['websocket'];
    }
    this.socket = io(environment.server, options);
  }

  on<K extends keyof Events, R = Parameters<Events[K]>[0]>(event: K): Observable<R> {
    return new Observable((observer) => {
      const callback = (data: R) => observer.next(data);
      this.socket.on(`${event}`, callback);
      return () => this.socket.off(`${event}`, callback);
    });
  }

  emit<K extends keyof Actions>(event: K, ...data: Parameters<Actions[K]>): void {
    this.socket.emit(`${event}`, data);
  }

  request<K extends keyof Actions, R = ReturnType<Actions[K]>>(event: K, ...data: Parameters<Actions[K]>): Observable<R> {
    const o = new Observable<R>((observer) => {
      this.socket.emit(`${event}`, data, (response: R | ErrorResponse) => {
        if ((response as ErrorResponse).error) {
          observer.error(response);
        } else {
          observer.next(response as R);
          observer.complete();
        }
      });
    });
    return o.pipe(timeout(5000));
  }
}
