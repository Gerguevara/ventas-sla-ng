import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEstadoOrdenComponent } from './dialog-estado-orden.component';

describe('DialogEstadoOrdenComponent', () => {
  let component: DialogEstadoOrdenComponent;
  let fixture: ComponentFixture<DialogEstadoOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEstadoOrdenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEstadoOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
