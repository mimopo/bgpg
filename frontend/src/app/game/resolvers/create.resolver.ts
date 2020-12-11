import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';

import { RoomService } from '../services/room.service';

@Injectable({ providedIn: 'any' })
export class CreateResolver implements Resolve<boolean> {
  constructor(private roomService: RoomService, private router: Router) {}

  async resolve(): Promise<boolean> {
    const room = await this.roomService.create().toPromise();
    return this.router.navigate(['game', room.id]);
  }
}
