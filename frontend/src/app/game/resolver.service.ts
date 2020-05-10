import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DiceService } from './services/dice.service';
import { RoomService } from './services/room.service';
import { TokenService } from './services/token.service';

import { environment } from 'src/environments/environment';
import { SocketService } from '../services/socket.service';

// TODO: type response
type JoinResponse = any;

@Injectable({
  providedIn: 'root',
})
export class ResolverService implements Resolve<JoinResponse> {
  private subscription: Subscription;

  constructor(
    private socket: SocketService,
    private http: HttpClient,
    private dice: DiceService,
    private room: RoomService,
    private token: TokenService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JoinResponse> {
    // TODO: type game json and join respone
    return this.socket.request<any>('room.join', route.params.id).pipe(
      tap((response) => {
        this.dice.init(response.dices);
        this.room.init(response.room);
        this.token.init(response.tokens);
        // TODO: Improve reconnect handling reloading the route instead of the page
        this.subscription = this.socket.on('connect').subscribe(() => window.location.reload());
      }),
      switchMap((response) => this.http.get(`${environment.server}/games/${response.room.game}.json`)),
    );
  }

  removeReconnectListener() {
    this.subscription.unsubscribe();
  }
}
