import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ErrorDto } from '@mimopo/bgpg-core';

import { GameComponent } from 'src/app/game/game.component';
import { Socket } from 'src/app/services/socket';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateService implements CanDeactivate<GameComponent> {
  constructor(private socket: Socket) {}

  canDeactivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.socket.emit('room.leave', null, (result: true | ErrorDto) => {
        if (result === true) {
          resolve(true);
        } else {
          reject(result);
        }
      });
    });
  }
}
