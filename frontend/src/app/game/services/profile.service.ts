import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Player } from 'bgpg/model/player';

import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'any',
})
export class ProfileService {
  get me(): Observable<Player> {
    return this.socket.player;
  }

  constructor(private socket: SocketService) {}
}
