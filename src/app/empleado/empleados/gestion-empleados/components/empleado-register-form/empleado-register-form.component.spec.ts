import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoRegisterFormComponent } from './empleado-register-form.component';

describe('EmpleadoRegisterFormComponent', () => {
  let component: EmpleadoRegisterFormComponent;
  let fixture: ComponentFixture<EmpleadoRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoRegisterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
