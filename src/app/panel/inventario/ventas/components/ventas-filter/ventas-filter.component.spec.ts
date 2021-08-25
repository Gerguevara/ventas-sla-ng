import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasFilterComponent } from './ventas-filter.component';

describe('VentasFilterComponent', () => {
  let component: VentasFilterComponent;
  let fixture: ComponentFixture<VentasFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
