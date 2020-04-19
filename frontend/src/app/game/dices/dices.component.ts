import { Component, OnInit } from '@angular/core';
import { DiceService } from '../services/dice.service';
import { Dice } from 'src/app/model/dice.class';
import { ActivatedRoute } from '@angular/router';
import { removeRecord } from 'src/app/utils/collection';

@Component({
  selector: 'app-dices',
  templateUrl: './dices.component.html',
  styleUrls: ['./dices.component.scss'],
})
export class DicesComponent implements OnInit {
  dices: Dice[] = [];
  selected: Dice[] = [];
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

  toggle(dice: Dice) {
    if (this.dices.indexOf(dice) === -1) {
      this.dices.push(dice);
    } else {
      removeRecord(this.dices, dice);
    }
  }

  roll(dices: Dice[]) {
    this.diceService.roll(dices.map((d) => d.id));
    this.shapes = this.route.snapshot.data.game.shapes;
  }
}
