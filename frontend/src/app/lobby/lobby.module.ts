import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LobbyRoutingModule } from './lobby-routing.module';
import { LobbyComponent } from './lobby.component';


@NgModule({
  declarations: [LobbyComponent],
  imports: [
    CommonModule,
    LobbyRoutingModule
  ]
})
export class LobbyModule { }
