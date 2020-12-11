/* eslint-disable @typescript-eslint/no-explicit-any */
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { RoomService } from '../services/room.service';
import { CreateResolver } from './create.resolver';

describe('CreateResolver', () => {
  let resolver: CreateResolver;
  let service: jasmine.SpyObj<RoomService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreateResolver,
        { provide: RoomService, useValue: jasmine.createSpyObj('RoomService', ['create']) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
      ],
      imports: [RouterTestingModule],
    });
    resolver = TestBed.inject(CreateResolver);
    service = TestBed.inject(RoomService) as jasmine.SpyObj<RoomService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should redirect when room is created', fakeAsync(() => {
    service.create.and.returnValue(of({ id: 'roomId' } as any));
    resolver.resolve();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(['game', 'roomId']);
  }));
});
