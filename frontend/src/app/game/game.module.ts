import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { CoreModule } from '../core/core.module';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { HudComponent } from './hud/hud.component';
import { DicesComponent } from './dices/dices.component';


@NgModule({
  declarations: [GameComponent, HudComponent, DicesComponent],
  imports: [
    CoreModule,
    GameRoutingModule,
    DragDropModule,
  ]
})
export class GameModule { }
