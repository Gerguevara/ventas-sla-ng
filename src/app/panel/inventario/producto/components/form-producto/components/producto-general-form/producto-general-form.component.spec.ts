import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoGeneralFormComponent } from './producto-general-form.component';

describe('ProductoGeneralFormComponent', () => {
  let component: ProductoGeneralFormComponent;
  let fixture: ComponentFixture<ProductoGeneralFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoGeneralFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoGeneralFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
