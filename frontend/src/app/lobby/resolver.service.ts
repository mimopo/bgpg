import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LobbyService } from './lobby.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {
  constructor(private lobbyService: LobbyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.lobbyService.join();
  }
}
