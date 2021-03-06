import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { replaceRecord } from 'src/app/utils/collection';
import { pairwise, switchMap, map, debounceTime, throttle, throttleTime } from 'rxjs/operators';

// TODO: Create class
type Token = any;

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokens$ = new BehaviorSubject<Token[]>([]);
  get tokens() {
    return this.tokens$.asObservable();
  }

  // private move$ = new Subject<Token>();

  constructor(private socket: Socket) {
    this.socket.on('token', (token: Token) => {
      replaceRecord(this.tokens$.value, token);
      this.tokens$.next(this.tokens$.value);
    });
    // this.move$
    //   .pipe(
    //     throttleTime(25),
    //   )
    //   .subscribe((token) => {
    //     this.socket.emit('token', token);
    //   });
  }

  init(tokens: Token[]) {
    this.tokens$.next(tokens);
  }

  move(token: Token, x: number, y: number) {
    token.x = x;
    token.y = y;
    // this.move$.next(token);
    this.socket.emit('token', token);
  }
}
