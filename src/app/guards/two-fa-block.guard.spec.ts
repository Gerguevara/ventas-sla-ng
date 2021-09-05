import { TestBed } from '@angular/core/testing';

import { TwoFaBlockGuard } from './two-fa-block.guard';

describe('TwoFaBlockGuard', () => {
  let guard: TwoFaBlockGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TwoFaBlockGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
