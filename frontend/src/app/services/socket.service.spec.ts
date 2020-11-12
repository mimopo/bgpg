import { TestBed } from '@angular/core/testing';
// import * as io from 'socket.io-client';

import { SocketService } from './socket.service';

describe('SocketService', () => {
  let service: SocketService;
  // let socketio: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // socketio = spyOn(io, 'connect');
    // socketio.and.returnValue({
    //   emit: () => {},
    //   on: () => {},
    //   off: () => {},
    // } as any);

    service = TestBed.inject(SocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    // expect(socketio).toHaveBeenCalled();
  });
});
