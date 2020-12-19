import { Component } from '@angular/core';

import { Player } from 'bgpg/model/player';

import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  player?: Player;

  constructor(private profile: ProfileService) {
    this.profile.me.subscribe((p) => {
      this.player = p;
    });
  }
}
