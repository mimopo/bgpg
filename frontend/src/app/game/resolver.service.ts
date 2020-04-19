import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { DiceService } from './services/dice.service';
import { RoomService } from './services/room.service';
import { TokenService } from './services/token.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// TODO: type response
type JoinResponse = any;

@Injectable({
  providedIn: 'root',
})
export class ResolverService implements Resolve<JoinResponse> {
  constructor(
    private socket: Socket,
    private http: HttpClient,
    private dice: DiceService,
    private room: RoomService,
    private token: TokenService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JoinResponse> {
    // TODO: type game json and join respone
    return this.join(route.params.id).pipe(
      tap((response) => {
        this.dice.init(response.dices);
        this.room.init(response.room);
        this.token.init(response.tokens);
      }),
      switchMap((response) => this.http.get(`${environment.server}/games/${response.room.game}.json`))
    );
  }

  // TODO: type response
  private join(roomId: string): Observable<JoinResponse> {
    return new Observable((subscriber) => {
      this.socket.emit('join', roomId, (response) => {
        subscriber.next(response);
        subscriber.complete();
      });
    });
  }
}
