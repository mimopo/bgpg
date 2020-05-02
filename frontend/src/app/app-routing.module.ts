import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'game/:id', loadChildren: () => import('./game/game.module').then((m) => m.GameModule) },
  { path: 'lobby', loadChildren: () => import('./lobby/lobby.module').then((m) => m.LobbyModule) },
  {
    path: '',
    redirectTo: 'lobby',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
