import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { map, tap } from 'rxjs/operators';

import { GameComponent } from 'src/app/game/game.component';
import { SocketService } from '../services/socket.service';
import { ResolverService } from './resolver.service';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateService implements CanDeactivate<GameComponent> {
  constructor(private socket: SocketService, private resolver: ResolverService) {}

  canDeactivate() {
    return this.socket.request('room.leave').pipe(
      tap(() => this.resolver.removeReconnectListener()),
      map(() => true),
    );
  }
}
