import { TestBed } from '@angular/core/testing';

import { DiceService } from './dice.service';

describe('DiceService', () => {
  let service: DiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
