import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEtiquetaComponent } from './table-etiqueta.component';

describe('TableEtiquetaComponent', () => {
  let component: TableEtiquetaComponent;
  let fixture: ComponentFixture<TableEtiquetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableEtiquetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
