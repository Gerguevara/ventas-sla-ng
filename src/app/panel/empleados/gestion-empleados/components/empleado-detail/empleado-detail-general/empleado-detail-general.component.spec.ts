import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoDetailGeneralComponent } from './empleado-detail-general.component';

describe('EmpleadoDetailGeneralComponent', () => {
  let component: EmpleadoDetailGeneralComponent;
  let fixture: ComponentFixture<EmpleadoDetailGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoDetailGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoDetailGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
