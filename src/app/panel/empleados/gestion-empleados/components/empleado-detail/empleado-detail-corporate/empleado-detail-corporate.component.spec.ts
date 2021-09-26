import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoDetailCorporateComponent } from './empleado-detail-corporate.component';

describe('EmpleadoDetailCorporateComponent', () => {
  let component: EmpleadoDetailCorporateComponent;
  let fixture: ComponentFixture<EmpleadoDetailCorporateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoDetailCorporateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoDetailCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
