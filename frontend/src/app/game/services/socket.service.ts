import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { timeout } from 'rxjs/operators';
import * as io from 'socket.io-client';

import { Actions } from 'bgpg/api/actions';
import { Events } from 'bgpg/api/events';
import { ErrorResponse } from 'bgpg/model/error-response';
import { Player } from 'bgpg/model/player';

import { environment } from '../../../environments/environment';

/**
 * Connects to the server using Socket.IO
 * Use this service from other services, don't use it from components
 */
@Injectable({ providedIn: 'any' })
export class SocketService implements OnDestroy {
  private socket: SocketIOClient.Socket;
  private player$ = new ReplaySubject<Player>(1);

  /** Returns the connection status */
  get connected(): boolean {
    return this.socket.connected;
  }

  get player(): Observable<Player> {
    return this.player$.asObservable();
  }

  constructor() {
    const options: SocketIOClient.ConnectOpts = environment.connectOptions;
    this.socket = io.connect(environment.server, options);
    this.socket.on('hello', (p: Player) => this.player$.next(p));
  }

  ngOnDestroy(): void {
    this.socket.removeAllListeners();
    this.socket.close();
  }

  /**
   * Listen to an event
   *
   * @param event Event name
   * @link Events
   */
  on<K extends keyof Events, R = Parameters<Events[K]>[0]>(event: K): Observable<R> {
    return new Observable((observer) => {
      const callback = (data: R) => observer.next(data);
      this.socket.on(`${event}`, callback);
      return () => this.socket.off(`${event}`, callback);
    });
  }

  /**
   * Sends an action to the server
   *
   * @param action Action name
   * @param data Action arguments
   * @link Actions
   */
  emit<K extends keyof Actions>(action: K, ...data: Parameters<Actions[K]>): void {
    this.socket.emit(`${action}`, ...data);
  }

  /**
   * Sends an action to the server and waits for response
   *
   * @param action Action name
   * @param data Action arguments
   * @link Actions
   */
  request<K extends keyof Actions, R = ReturnType<Actions[K]>>(action: K, ...data: Parameters<Actions[K]>): Observable<R> {
    const o = new Observable<R>((observer) => {
      this.socket.emit(`${action}`, ...data, (response: R | ErrorResponse) => {
        if (response && (response as ErrorResponse).error) {
          observer.error(response);
        } else {
          observer.next(response as R);
          observer.complete();
        }
      });
    });
    return o.pipe(timeout(environment.requestTimeout));
  }
}
