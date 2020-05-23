import { Injectable } from '@angular/core';
import { RoomDto } from '@mimopo/bgpg-core';
import { ReplaySubject } from 'rxjs';

import { SocketService } from '../../services/socket.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private room$ = new ReplaySubject<RoomDto>(1);
  get room() {
    return this.room$.asObservable();
  }

  constructor(private socket: SocketService) {
    this.socket.on('room').subscribe((room: RoomDto) => {
      this.room$.next(room);
    });
  }

  init(room: RoomDto) {
    this.room$.next(room);
  }
}
