import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEtiquetaComponent } from './form-etiqueta.component';

describe('FormEtiquetaComponent', () => {
  let component: FormEtiquetaComponent;
  let fixture: ComponentFixture<FormEtiquetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEtiquetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
