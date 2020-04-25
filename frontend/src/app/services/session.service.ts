import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Socket } from './socket';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private user$ = new Subject();

  get user() {
    return this.user$.asObservable();
  }

  constructor(private socket: Socket) {
    this.socket.on('login', (player) => this.user$.next(player));
  }
}
