import { NgModule } from '@angular/core';

import { LobbyRoutingModule } from './lobby-routing.module';
import { LobbyComponent } from './lobby.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [LobbyComponent],
  imports: [CoreModule, LobbyRoutingModule],
})
export class LobbyModule {}
