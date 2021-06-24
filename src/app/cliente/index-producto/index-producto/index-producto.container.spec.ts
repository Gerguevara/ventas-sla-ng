import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexProductoContainer } from './index-producto.container';

describe('IndexProductoContainer', () => {
  let component: IndexProductoContainer;
  let fixture: ComponentFixture<IndexProductoContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexProductoContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexProductoContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
