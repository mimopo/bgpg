import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiceDto } from '@mimopo/bgpg-core';

import { removeRecord } from '../../utils/collection';
import { DiceService } from '../services/dice.service';

@Component({
  selector: 'app-dices',
  templateUrl: './dices.component.html',
  styleUrls: ['./dices.component.scss'],
})
export class DicesComponent implements OnInit {
  dices: DiceDto[] = [];
  selected: DiceDto[] = [];
  shapes: Record<string, string> = {};
  history: { date: Date; dices: string[] }[] = [];

  // TODO: Stop injecting the route
  constructor(private route: ActivatedRoute, private diceService: DiceService) {}

  ngOnInit(): void {
    this.shapes = this.route.snapshot.data.game.shapes;
    this.diceService.dices.subscribe((dices) => {
      this.dices = dices;
    });
    this.diceService.history.subscribe((dices) => {
      this.history.unshift({
        date: new Date(),
        dices: dices.map((d) => d.shape),
      });
      this.history.splice(10);
    });
  }

  toggle(dice: DiceDto) {
    if (this.dices.indexOf(dice) === -1) {
      this.dices.push(dice);
    } else {
      removeRecord(this.dices, dice);
    }
  }

  roll(dices: DiceDto[]) {
    this.diceService.roll(dices.map((d) => d.id));
    this.shapes = this.route.snapshot.data.game.shapes;
  }
}
