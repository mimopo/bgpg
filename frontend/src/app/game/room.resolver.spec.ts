/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RoomService } from '../services/room.service';
import { RoomResolver } from './room.resolver';

describe('RoomResolver', () => {
  let resolver: RoomResolver;
  let service: jasmine.SpyObj<RoomService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomResolver, { provide: RoomService, useValue: jasmine.createSpyObj('RoomService', ['join']) }],
    });
    resolver = TestBed.inject(RoomResolver);
    service = TestBed.inject(RoomService) as jasmine.SpyObj<RoomService>;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('resolve: returns a room', (done) => {
    const room = { id: 'foo', name: 'bar' };
    service.join.and.returnValue(of(room));
    const route: any = {
      params: {
        id: 'foo',
      },
    };
    resolver.resolve(route).subscribe((response) => {
      expect(response).toBe(room);
      done();
    });
  });
});
