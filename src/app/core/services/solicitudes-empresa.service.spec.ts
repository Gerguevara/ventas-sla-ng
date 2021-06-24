import { TestBed } from '@angular/core/testing';

import { SolicitudesEmpresaService } from './solicitudes-empresa.service';

describe('SolicitudesEmpresaService', () => {
  let service: SolicitudesEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudesEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
