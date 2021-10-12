import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasReportComponent } from './ventas-report.component';

describe('VentasReportComponent', () => {
  let component: VentasReportComponent;
  let fixture: ComponentFixture<VentasReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});