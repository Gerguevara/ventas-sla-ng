import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoRegisterFormCorporateComponent } from './empleado-register-form-corporate.component';

describe('EmpleadoRegisterFormCorporateComponent', () => {
  let component: EmpleadoRegisterFormCorporateComponent;
  let fixture: ComponentFixture<EmpleadoRegisterFormCorporateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoRegisterFormCorporateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoRegisterFormCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
