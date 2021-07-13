import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEtiquetaComponent } from './delete-etiqueta.component';

describe('DeleteEtiquetaComponent', () => {
  let component: DeleteEtiquetaComponent;
  let fixture: ComponentFixture<DeleteEtiquetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteEtiquetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
