import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoDetailsComponent } from './departamento-details.component';

describe('DepartamentoDetailsComponent', () => {
  let component: DepartamentoDetailsComponent;
  let fixture: ComponentFixture<DepartamentoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartamentoDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartamentoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
