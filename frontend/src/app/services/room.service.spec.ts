/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { RoomService } from './room.service';
import { SocketService } from './socket.service';

const joinFake: any = (e: string, id: string) => of({ id, name: 'name' });

describe('RoomService', () => {
  let service: RoomService;
  let socket: jasmine.SpyObj<SocketService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomService, { provide: SocketService, useValue: jasmine.createSpyObj('SocketService', ['request']) }],
    });
    service = TestBed.inject(RoomService);
    socket = TestBed.inject(SocketService) as jasmine.SpyObj<SocketService>;
    socket.request.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('join: returns a room', (done) => {
    const room: any = { id: 'foo', name: 'bar' };
    socket.request.and.returnValue(of(room));
    service.join('foo').subscribe((response) => {
      expect(response).toBe(room);
      done();
    });
  });

  it('join: doesnt make socket calls when try to join to the same room', (done) => {
    socket.request.and.callFake(joinFake);
    service
      .join('foo')
      .pipe(
        switchMap(() => {
          socket.request.calls.reset();
          return service.join('foo');
        }),
      )
      .subscribe(() => {
        expect(socket.request.calls.count()).toBe(0);
        done();
      });
  });

  it('join: leaves the room before', (done) => {
    socket.request.and.callFake(joinFake);
    service
      .join('baz')
      .pipe(
        switchMap(() => {
          socket.request.calls.reset();
          return service.join('foo');
        }),
      )
      .subscribe(() => {
        expect(socket.request.calls.first().args).toEqual(['leave']);
        done();
      });
  });

  it('create: returns a room', (done) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const room: any = { id: 'foo', name: 'bar' };
    socket.request.and.returnValue(of(room));
    service.create().subscribe((response) => {
      expect(response).toBe(room);
      done();
    });
  });

  it('create: leaves the room before', (done) => {
    socket.request.and.callFake(joinFake);
    service
      .join('baz')
      .pipe(
        switchMap(() => {
          socket.request.calls.reset();
          return service.create();
        }),
      )
      .subscribe(() => {
        expect(socket.request.calls.first().args).toEqual(['leave']);
        done();
      });
  });

  it('leave: leaves the socket room', (done) => {
    socket.request.and.callFake(joinFake);
    service
      .join('baz')
      .pipe(switchMap(() => service.leave()))
      .subscribe(() => {
        expect(socket.request.calls.mostRecent().args).toEqual(['leave']);
        done();
      });
  });

  it('leave: doesnt make socket calls if not in a room', (done) => {
    service.leave().subscribe(() => {
      expect(socket.request.calls.count()).toBe(0);
      done();
    });
  });
});
