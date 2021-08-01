import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoInventarioFormComponent } from './producto-inventario-form.component';

describe('ProductoInventarioFormComponent', () => {
  let component: ProductoInventarioFormComponent;
  let fixture: ComponentFixture<ProductoInventarioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoInventarioFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoInventarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
