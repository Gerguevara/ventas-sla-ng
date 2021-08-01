import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoRegisterFormGeneralComponent } from './empleado-register-form-general.component';

describe('EmpleadoRegisterFormGeneralComponent', () => {
  let component: EmpleadoRegisterFormGeneralComponent;
  let fixture: ComponentFixture<EmpleadoRegisterFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoRegisterFormGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoRegisterFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
