import { Injectable } from '@angular/core';
import { PlayerDto } from '@mimopo/bgpg-core';
import { BehaviorSubject } from 'rxjs';

import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private player$ = new BehaviorSubject<PlayerDto>(localStorage.get('player'));

  get player() {
    return this.player$.asObservable();
  }

  constructor(private socket: SocketService) {
    this.socket.on('login').subscribe((player: PlayerDto) => this.player$.next(player));
  }

  // updatePlayer(player: PlayerDto) {

  // }
}
