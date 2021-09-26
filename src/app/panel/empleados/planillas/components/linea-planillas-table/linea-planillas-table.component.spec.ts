import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaPlanillasTableComponent } from './linea-planillas-table.component';

describe('LineaPlanillasTableComponent', () => {
  let component: LineaPlanillasTableComponent;
  let fixture: ComponentFixture<LineaPlanillasTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineaPlanillasTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaPlanillasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
