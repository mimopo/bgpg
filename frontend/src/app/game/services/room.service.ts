import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Player } from 'bgpg/model/player';
import { Room } from 'bgpg/model/room';

import { SocketService } from './socket.service';

/**
 * Manages the room connection
 */
@Injectable({ providedIn: 'any' })
export class RoomService {
  private room$ = new BehaviorSubject<Room | undefined>(undefined);
  private players$ = new BehaviorSubject<Player[]>([]);

  get room(): Observable<Room | undefined> {
    return this.room$.asObservable();
  }

  get players(): Observable<Player[]> {
    return this.players$.asObservable();
  }

  constructor(private socket: SocketService) {
    this.room.subscribe((room) => {
      this.players$.next(room?.players || []);
    });
    this.socket.on('playerJoined').subscribe((player) => {
      this.players$.next([...this.players$.value, player]);
    });
    this.socket.on('playerLeft').subscribe((playerId) => {
      const players = this.players$.value;
      const index = players.findIndex((p) => p.id === playerId);
      this.players$.next([...players.slice(0, index), ...players.slice(index + 1)]);
    });
    this.socket.on('playerUpdated').subscribe((update) => {
      const players = this.players$.value;
      const player = players.find((p) => p.id === update.id);
      Object.assign(player, update);
      this.players$.next(players); // TODO: Avoid value modification
    });
  }

  /**
   * Join into a room. It leaves the current room before.
   */
  join(id: string): Observable<Room> {
    if (this.room$.value?.id === id) {
      return of(this.room$.value);
    }
    return this.leave().pipe(
      switchMap(() => this.socket.request('joinRoom', id)),
      tap((room) => this.room$.next(room)),
    );
  }

  /**
   * Create an empty room. It leaves the current room before.
   */
  create(): Observable<Room> {
    return this.leave().pipe(
      switchMap(() => this.socket.request('createRoom')),
      tap((room) => this.room$.next(room)),
    );
  }

  /**
   * Leaves the current room
   */
  leave(): Observable<boolean> {
    if (!this.room$.value) {
      return of(true);
    }
    return this.socket.request('leaveRoom').pipe(tap(() => this.room$.next(undefined)));
  }
}
