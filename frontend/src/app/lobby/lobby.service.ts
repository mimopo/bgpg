import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { replaceRecord } from '../utils/collection';
import { Socket } from '../services/socket';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  private rooms$ = new BehaviorSubject<[]>([]);

  get rooms() {
    return this.rooms$.asObservable();
  }

  constructor(private socket: Socket) {
    // this.socket.of('lobby');
    this.socket.on('room', (room) => {
      replaceRecord(this.rooms$.value, room);
      this.rooms$.next(this.rooms$.value);
    });
  }

  join(): Observable<[]> {
    return new Observable((subscriber) => {
      this.socket.emit('lobby', null, (rooms: []) => {
        this.rooms$.next(rooms);
        subscriber.next(rooms);
        subscriber.complete();
      });
    });
  }
}
