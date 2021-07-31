import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoRegisterFormDocumentsComponent } from './empleado-register-form-documents.component';

describe('EmpleadoRegisterFormDocumentsComponent', () => {
  let component: EmpleadoRegisterFormDocumentsComponent;
  let fixture: ComponentFixture<EmpleadoRegisterFormDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoRegisterFormDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoRegisterFormDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
