import { TestBed } from '@angular/core/testing';

import { FormProductoService } from './form-producto.service';

describe('FormProductoService', () => {
  let service: FormProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
