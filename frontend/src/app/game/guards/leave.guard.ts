import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RoomService } from '../services/room.service';

@Injectable({
  providedIn: 'any',
})
export class LeaveGuard implements CanDeactivate<unknown> {
  constructor(private roomService: RoomService) {}

  canDeactivate(): Observable<boolean> {
    return this.roomService.leave().pipe(map(() => true));
  }
}
