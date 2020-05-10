import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { SocketService } from '../../services/socket.service';

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

  constructor(private socket: SocketService) {
    this.socket.on('room').subscribe((room: Room) => {
      this.room$.next(room);
    });
  }

  init(room: Room) {
    this.room$.next(room);
  }
}
