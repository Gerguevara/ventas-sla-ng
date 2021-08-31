import { TestBed } from '@angular/core/testing';

import { TwoFaGuard } from './two-fa.guard';

describe('TwoFaGuard', () => {
  let guard: TwoFaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TwoFaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
