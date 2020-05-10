import { Injectable } from '@angular/core';
import { classToPlain, plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';

import { RoomDto } from '@mimopo/bgpg-core';

import { SocketService } from '../services/socket.service';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  constructor(private socket: SocketService) {}

  create(room: RoomDto) {
    return this.socket.request('room.create', classToPlain(room)).pipe(map((response: RoomDto) => plainToClass(RoomDto, response)));
  }
}
