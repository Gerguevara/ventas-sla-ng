import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlanillaFormComponent } from './create-planilla-form.component';

describe('CreatePlanillaFormComponent', () => {
  let component: CreatePlanillaFormComponent;
  let fixture: ComponentFixture<CreatePlanillaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlanillaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlanillaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
