import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Room } from 'bgpg/model/room';

import { SocketService } from './socket.service';

/**
 * Manages the room connection
 */
@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private room?: Room;

  constructor(private socket: SocketService) {}

  /**
   * Join into a room. It leaves the current room before.
   */
  join(id: string): Observable<Room> {
    if (this.room?.id === id) {
      return of(this.room);
    }
    return this.leave().pipe(
      switchMap(() => this.socket.request('joinRoom', id)),
      tap((room) => {
        this.room = room;
      }),
    );
  }

  /**
   * Create an empty room. It leaves the current room before.
   */
  create(): Observable<Room> {
    return this.leave().pipe(
      switchMap(() => this.socket.request('createRoom')),
      tap((room) => {
        this.room = room;
      }),
    );
  }

  /**
   * Leaves the current room
   */
  leave(): Observable<void> {
    if (!this.room) {
      return of(undefined);
    }
    return this.socket.request('leave').pipe(
      tap(() => {
        this.room = undefined;
      }),
    );
  }
}
