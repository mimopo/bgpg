import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RoomService } from '../services/room.service';
import { LeaveGuard } from './leave.guard';

describe('LeaveGuard', () => {
  let guard: LeaveGuard;
  let service: jasmine.SpyObj<RoomService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveGuard, { provide: RoomService, useValue: jasmine.createSpyObj('RoomService', ['leave']) }],
    });
    guard = TestBed.inject(LeaveGuard);
    service = TestBed.inject(RoomService) as jasmine.SpyObj<RoomService>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canDeactivate should wait until leave the room', (done) => {
    service.leave.and.returnValue(of(true));
    guard.canDeactivate().subscribe((response) => {
      expect(service.leave).toHaveBeenCalled();
      expect(response).toBe(true);
      done();
    });
  });
});
