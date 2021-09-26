import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRemovedCartComponent } from './product-removed-cart.component';

describe('ProductRemovedCartComponent', () => {
  let component: ProductRemovedCartComponent;
  let fixture: ComponentFixture<ProductRemovedCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductRemovedCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRemovedCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
