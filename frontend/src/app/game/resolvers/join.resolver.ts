import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Room } from 'bgpg/model/room';

import { RoomService } from '../services/room.service';

@Injectable({ providedIn: 'any' })
export class JoinResolver implements Resolve<Room> {
  constructor(private roomService: RoomService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Room> {
    return this.roomService.join(route.params.id);
  }
}
