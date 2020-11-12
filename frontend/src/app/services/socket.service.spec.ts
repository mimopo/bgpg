import { TestBed } from '@angular/core/testing';
import * as io from 'socket.io-client';

import { SocketService } from './socket.service';

describe('SocketService', () => {
  let service: SocketService;
  let ioConnect: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    ioConnect = spyOn(io, 'connect');
    service = TestBed.inject(SocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('creates a socket.io connection', () => {
    expect(ioConnect).toHaveBeenCalled();
  });
});
