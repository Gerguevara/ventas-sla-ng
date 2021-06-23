import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEtiquetaComponent } from './detail-etiqueta.component';

describe('DetailEtiquetaComponent', () => {
  let component: DetailEtiquetaComponent;
  let fixture: ComponentFixture<DetailEtiquetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEtiquetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
