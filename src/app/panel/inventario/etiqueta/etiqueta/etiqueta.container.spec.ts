import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetaContainer } from './etiqueta.container';

describe('EtiquetaContainer', () => {
  let component: EtiquetaContainer;
  let fixture: ComponentFixture<EtiquetaContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtiquetaContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiquetaContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
