import { Injectable } from '@angular/core';
import { ErrorDto } from '@mimopo/bgpg-core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import io from 'socket.io-client';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: SocketIOClient.Socket;

  get connected() {
    return this.socket.connected;
  }

  constructor() {
    this.socket = io(environment.server, {
      transports: ['websocket'], // TODO: Remove
      query: {
        player: localStorage.getItem('player'),
      },
    });
  }

  on<T>(event: string): Observable<T> {
    return new Observable((observer) => {
      const callback = (data: any) => observer.next(data);
      this.socket.on(event, callback);
      return () => this.socket.off(event, callback);
    });
  }

  emit(event: string, data?: any): void {
    this.socket.emit(event, data);
  }

  request<T>(event: string, data?: any): Observable<T> {
    const o = new Observable<T>((observer) => {
      this.socket.emit(event, data, (response: any) => {
        if ((response as ErrorDto).error) {
          observer.error(response);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
    return o.pipe(timeout(5000));
  }
}
