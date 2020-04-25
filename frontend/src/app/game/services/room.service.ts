import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { Socket } from 'src/app/services/socket';

// TODO: Create interface
type Room = any;

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private room$ = new ReplaySubject<Room>(1);
  get room() {
    return this.room$.asObservable();
  }

  constructor(private socket: Socket) {
    this.socket.on('room', (room: Room) => {
      this.room$.next(room);
    });
  }

  init(room: Room) {
    this.room$.next(room);
  }
}
