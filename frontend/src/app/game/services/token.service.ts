import { Injectable } from '@angular/core';
import { TokenDto } from '@mimopo/bgpg-core';
import { BehaviorSubject } from 'rxjs';
import { replaceRecord } from 'src/app/utils/collection';

import { SocketService } from '../../services/socket.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokens$ = new BehaviorSubject<TokenDto[]>([]);
  get tokens() {
    return this.tokens$.asObservable();
  }

  // private move$ = new Subject<Token>();

  constructor(private socket: SocketService) {
    this.socket.on('token').subscribe((token: TokenDto) => {
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

  init(tokens: TokenDto[]) {
    this.tokens$.next(tokens);
  }

  move(token: TokenDto, x: number, y: number) {
    token.x = x;
    token.y = y;
    // this.move$.next(token);
    this.socket.emit('token', token);
  }
}
