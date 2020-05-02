import { Injectable } from '@angular/core';
import { classToPlain, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';

import { ErrorDto, RoomDto } from '@mimopo/bgpg-core';

import { Socket } from '../services/socket';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  constructor(private socket: Socket) {}

  create(room: RoomDto) {
    return new Observable((subscriber) => {
      this.socket.emit('room.create', classToPlain(room), (response: RoomDto | ErrorDto) => {
        if ((response as ErrorDto).error) {
          subscriber.error(response);
        } else {
          subscriber.next(plainToClass(RoomDto, response));
          subscriber.complete();
        }
      });
    });
  }
}
