import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoDesignFormComponent } from './producto-design-form.component';

describe('ProductoDesignFormComponent', () => {
  let component: ProductoDesignFormComponent;
  let fixture: ComponentFixture<ProductoDesignFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoDesignFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoDesignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
