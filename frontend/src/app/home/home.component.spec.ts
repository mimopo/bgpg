import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { RoomService } from '../services/room.service';
import { HomeComponent } from './home.component';

// tslint:disable-next-line: no-any
const roomMock: any = { room: 'foo', name: 'bar' };

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let roomService: jasmine.SpyObj<RoomService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: RoomService, useValue: jasmine.createSpyObj('RoomService', ['create']) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
      ],
      declarations: [HomeComponent],
      imports: [FormsModule, RouterTestingModule],
    }).compileComponents();
    // Mock RoomService
    roomService = TestBed.inject(RoomService) as jasmine.SpyObj<RoomService>;
    roomService.create.calls.reset();
    // Mock Router
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    router.navigate.calls.reset();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('create: should call RoomService.create', () => {
    roomService.create.and.returnValue(of(roomMock));
    component.create();
    expect(roomService.create).toHaveBeenCalled();
  });

  it('create: should show an error if something fails', async () => {
    roomService.create.and.returnValue(throwError(new Error()));
    await component.create();
    expect(component.error).toBeTruthy();
  });

  it('create: should lock the form while waiting', fakeAsync(() => {
    roomService.create.and.returnValue(throwError(new Error()).pipe(delay(50)));
    expect(component.submitting).toBeFalsy();
    component.create();
    expect(component.submitting).toBeTruthy();
    tick(100);
    expect(component.submitting).toBeFalsy();
  }));

  it('join: should redirect to the game route', async () => {
    router.navigate.and.resolveTo(true);
    await component.join('foo');
    expect(router.navigate).toHaveBeenCalledWith(['game', 'foo']);
  });

  it('join: should show an error if navigate fails', async () => {
    router.navigate.and.rejectWith(false);
    await component.join('foo');
    expect(component.error).toBeTruthy();
  });

  it('join: should lock the form while waiting', fakeAsync(() => {
    router.navigate.and.rejectWith(false);
    expect(component.submitting).toBeFalsy();
    component.join('foo');
    expect(component.submitting).toBeTruthy();
    tick(100);
    expect(component.submitting).toBeFalsy();
  }));
});
