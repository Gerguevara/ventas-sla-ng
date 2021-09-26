import { TestBed } from '@angular/core/testing';

import { TwoStepAuthService } from './two-step-auth.service';

describe('TwoStepAuthService', () => {
  let service: TwoStepAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwoStepAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
