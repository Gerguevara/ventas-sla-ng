import { TestBed } from '@angular/core/testing';

import { UserConfigGuard } from './user-config.guard';

describe('UserConfigGuard', () => {
  let guard: UserConfigGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserConfigGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
