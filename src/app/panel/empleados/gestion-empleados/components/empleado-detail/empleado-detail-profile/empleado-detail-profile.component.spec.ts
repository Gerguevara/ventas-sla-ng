import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoDetailProfileComponent } from './empleado-detail-profile.component';

describe('EmpleadoDetailProfileComponent', () => {
  let component: EmpleadoDetailProfileComponent;
  let fixture: ComponentFixture<EmpleadoDetailProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoDetailProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoDetailProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
