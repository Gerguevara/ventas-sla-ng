import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductoContainerComponent } from './form-producto-container.component';

describe('FormProductoContainerComponent', () => {
  let component: FormProductoContainerComponent;
  let fixture: ComponentFixture<FormProductoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProductoContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProductoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
