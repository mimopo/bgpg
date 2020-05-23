import { Injectable } from '@angular/core';
import { DiceDto } from '@mimopo/bgpg-core';
import { BehaviorSubject, Subject } from 'rxjs';

import { SocketService } from '../../services/socket.service';
import { replaceRecord } from '../../utils/collection';

@Injectable({
  providedIn: 'root',
})
export class DiceService {
  private dices$ = new BehaviorSubject<DiceDto[]>([]);
  get dices() {
    return this.dices$.asObservable();
  }

  private history$ = new Subject<DiceDto[]>();
  get history() {
    return this.history$.asObservable();
  }

  constructor(private socket: SocketService) {
    this.socket.on('dices').subscribe((dices: DiceDto[]) => {
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

  init(dices: DiceDto[]) {
    this.dices$.next(dices);
  }
}
