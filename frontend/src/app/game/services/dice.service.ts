import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Socket } from 'ngx-socket-io';

import { Dice } from 'src/app/model/dice.class';
import { replaceRecord } from 'src/app/utils/collection';

@Injectable({
  providedIn: 'root',
})
export class DiceService {
  private dices$ = new BehaviorSubject<Dice[]>([]);
  get dices() {
    return this.dices$.asObservable();
  }

  private history$ = new Subject<Dice[]>();
  get history() {
    return this.history$.asObservable();
  }

  constructor(private socket: Socket) {
    this.socket.on('dices', (dices: Dice[]) => {
      dices.forEach((dice) => {
        replaceRecord(this.dices$.value, dice);
      });
      this.dices$.next(this.dices$.value);
      this.history$.next(dices);
    });
  }

  roll(ids: string[]) {
    this.socket.emit('roll', ids);
  }

  init(dices: Dice[]) {
    this.dices$.next(dices);
  }
}
