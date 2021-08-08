import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillasIndexComponent } from './planillas-index.component';

describe('PlanillasIndexComponent', () => {
  let component: PlanillasIndexComponent;
  let fixture: ComponentFixture<PlanillasIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanillasIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillasIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
