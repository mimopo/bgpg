import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
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

  beforeEach(
    waitForAsync(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  // CLASS TESTS

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

  it('create: should lock forms while submitting', fakeAsync(() => {
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

  it('join: should lock forms while submitting', fakeAsync(() => {
    router.navigate.and.rejectWith(false);
    expect(component.submitting).toBeFalsy();
    component.join('foo');
    expect(component.submitting).toBeTruthy();
    tick(100);
    expect(component.submitting).toBeFalsy();
  }));

  // UI TESTS

  it('create-button: should be disabled while submitting', () => {
    const e: HTMLElement = fixture.debugElement.nativeElement;
    const button = e.querySelector<HTMLButtonElement>('#create-button');
    expect(button?.disabled).toBeFalse();
    component.submitting = true;
    fixture.detectChanges();
    expect(button?.disabled).toBeTrue();
  });

  it('create-button: should call create', () => {
    spyOn(component, 'create').and.resolveTo(true);
    const e: HTMLElement = fixture.debugElement.nativeElement;
    const button = e.querySelector<HTMLButtonElement>('#create-button');
    button?.click();
    expect(component.create).toHaveBeenCalled();
  });

  it('join-button: should be locked while submitting', () => {
    const e: HTMLElement = fixture.debugElement.nativeElement;
    const button = e.querySelector<HTMLButtonElement>('#join-button');
    expect(button?.disabled).toBeFalse();
    component.submitting = true;
    fixture.detectChanges();
    expect(button?.disabled).toBeTrue();
  });

  it('join-form: should call join', () => {
    spyOn(component, 'join').and.resolveTo(true);
    const e: HTMLElement = fixture.debugElement.nativeElement;
    const button = e.querySelector<HTMLButtonElement>('#join-button');
    const input = e.querySelector<HTMLInputElement>('#join-form-id');
    if (input) {
      input.value = 'foo-bar';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }
    button?.click();
    expect(component.join).toHaveBeenCalledWith('foo-bar');
  });

  it('error: should print error message', () => {
    const e: HTMLElement = fixture.debugElement.nativeElement;
    const selector = '#error-dialog';
    expect(e.querySelector(selector)).toBeFalsy();
    component.error = 'Error';
    fixture.detectChanges();
    expect(e.querySelector(selector)?.textContent).toContain('Error');
  });
});
