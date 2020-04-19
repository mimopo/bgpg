import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DicesComponent } from './dices.component';

describe('DicesComponent', () => {
  let component: DicesComponent;
  let fixture: ComponentFixture<DicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
