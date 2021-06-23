import { TestBed } from '@angular/core/testing';

import { LoginEmpresasService } from './login-empresas.service';

describe('LoginEmpresasService', () => {
  let service: LoginEmpresasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginEmpresasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
