import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent } from './game.component';
import { ResolverService } from './resolver.service';

const routes: Routes = [{ path: '', component: GameComponent, resolve: { game: ResolverService } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
