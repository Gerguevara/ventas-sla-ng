import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoConfirmationDialogComponent } from './empleado-confirmation-dialog.component';

describe('EmpleadoConfirmationDialogComponent', () => {
  let component: EmpleadoConfirmationDialogComponent;
  let fixture: ComponentFixture<EmpleadoConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoConfirmationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
