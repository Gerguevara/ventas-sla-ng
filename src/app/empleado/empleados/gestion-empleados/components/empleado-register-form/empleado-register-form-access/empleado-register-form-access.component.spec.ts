import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoRegisterFormAccessComponent } from './empleado-register-form-access.component';

describe('EmpleadoRegisterFormAccessComponent', () => {
  let component: EmpleadoRegisterFormAccessComponent;
  let fixture: ComponentFixture<EmpleadoRegisterFormAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoRegisterFormAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoRegisterFormAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
