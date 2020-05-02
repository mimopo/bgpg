import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { DicesComponent } from './dices/dices.component';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { HudComponent } from './hud/hud.component';


@NgModule({
  declarations: [GameComponent, HudComponent, DicesComponent],
  imports: [
    CoreModule,
    GameRoutingModule,
    DragDropModule,
  ]
})
export class GameModule { }
