import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoContainerComponent } from './departamento-container.component';

describe('DepartamentoContainerComponent', () => {
  let component: DepartamentoContainerComponent;
  let fixture: ComponentFixture<DepartamentoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartamentoContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartamentoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
