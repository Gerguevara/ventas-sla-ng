import { TestBed } from '@angular/core/testing';

import { CategoriasIndexService } from './categorias-index.service';

describe('CategoriasIndexService', () => {
  let service: CategoriasIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriasIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
