import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent } from './game.component';
import { LeaveGuard } from './guards/leave.guard';
import { CreateResolver } from './resolvers/create.resolver';
import { JoinResolver } from './resolvers/join.resolver';

const routes: Routes = [
  { path: 'create', component: GameComponent, resolve: { room: CreateResolver } },
  { path: ':id', component: GameComponent, resolve: { room: JoinResolver }, canDeactivate: [LeaveGuard] },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
