import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillasFormComponent } from './planillas-form.component';

describe('PlanillasFormComponent', () => {
  let component: PlanillasFormComponent;
  let fixture: ComponentFixture<PlanillasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanillasFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
