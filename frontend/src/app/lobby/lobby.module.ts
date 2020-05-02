import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { LobbyRoutingModule } from './lobby-routing.module';
import { LobbyComponent } from './lobby.component';

@NgModule({
  declarations: [LobbyComponent],
  imports: [CoreModule, LobbyRoutingModule],
})
export class LobbyModule {}
