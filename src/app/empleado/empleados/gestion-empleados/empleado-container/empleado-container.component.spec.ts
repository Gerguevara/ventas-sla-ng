import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoContainerComponent } from './empleado-container.component';

describe('EmpleadoContainerComponent', () => {
  let component: EmpleadoContainerComponent;
  let fixture: ComponentFixture<EmpleadoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
