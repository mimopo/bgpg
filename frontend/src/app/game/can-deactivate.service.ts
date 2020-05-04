import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ErrorDto } from '@mimopo/bgpg-core';

import { GameComponent } from 'src/app/game/game.component';
import { ResolverService } from 'src/app/game/resolver.service';
import { Socket } from 'src/app/services/socket';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateService implements CanDeactivate<GameComponent> {
  constructor(private socket: Socket, private resolver: ResolverService) {}

  canDeactivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.resolver.removeReconnectListener();
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
