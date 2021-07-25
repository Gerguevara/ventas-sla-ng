import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoConfirmationDialogComponent } from './departamento-confirmation-dialog.component';

describe('DepartamentoConfirmationDialogComponent', () => {
  let component: DepartamentoConfirmationDialogComponent;
  let fixture: ComponentFixture<DepartamentoConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartamentoConfirmationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartamentoConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
