import { fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import * as io from 'socket.io-client';

import { ErrorResponse } from 'bgpg/model/error-response';

import { environment } from '../../environments/environment';
import { SocketService } from './socket.service';

describe('SocketService', () => {
  let service: SocketService;
  let ioConnect: jasmine.Spy;
  let socket: SocketIOClient.Socket;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    ioConnect = spyOn(io, 'connect').and.returnValue({
      emit: jasmine.createSpy(),
      on: jasmine.createSpy(),
      off: jasmine.createSpy(),
      connected: true,
      // tslint:disable-next-line: no-any
    } as any);
    service = TestBed.inject(SocketService);
    // tslint:disable-next-line: no-string-literal
    socket = service['socket'];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('creates a socket.io connection', () => {
    expect(ioConnect).toHaveBeenCalled();
  });

  it('connected: returns the connection status', () => {
    expect(service.connected).toBe(socket.connected);
  });

  it('on: calls "on" on subscribe, "off" on unsubscribe', () => {
    const s = service.on('foo').subscribe();
    expect(socket.on).toHaveBeenCalledWith('foo', jasmine.any(Function));
    s.unsubscribe();
    expect(socket.off).toHaveBeenCalledWith('foo', jasmine.any(Function));
  });

  it('emit: emit event on call', () => {
    service.emit('createRoom');
    expect(socket.emit).toHaveBeenCalledWith('createRoom');
  });

  it('request: emit event on subscribe', () => {
    const o = service.request('createRoom');
    expect(socket.emit).toHaveBeenCalledTimes(0);
    o.subscribe();
    expect(socket.emit).toHaveBeenCalledWith('createRoom', jasmine.any(Function));
  });

  it('request: emit event data', (done) => {
    const room = { id: 'id', name: 'name' };
    service.request('createRoom').subscribe((v) => {
      expect(v).toBe(room);
      done();
    });
    const callback = (socket.emit as jasmine.Spy).calls.mostRecent().args[1];
    callback(room);
  });

  it('request: emit event error', (done) => {
    const error = { error: 'unexpected', message: 'foo' } as ErrorResponse;
    service.request('createRoom').subscribe({
      error: (v) => {
        expect(v).toBe(error);
        done();
      },
    });
    const callback = (socket.emit as jasmine.Spy).calls.mostRecent().args[1];
    callback(error);
  });

  it('request: emit error on timeout', fakeAsync(() => {
    environment.requestTimeout = 50;
    let error;
    service.request('createRoom').subscribe({
      error: (v) => {
        error = v;
      },
    });
    tick(100);
    expect(error).toBeTruthy();
  }));
});
