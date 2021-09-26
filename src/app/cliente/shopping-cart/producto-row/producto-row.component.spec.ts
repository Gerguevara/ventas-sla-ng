import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoRowComponent } from './producto-row.component';

describe('ProductoRowComponent', () => {
  let component: ProductoRowComponent;
  let fixture: ComponentFixture<ProductoRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
