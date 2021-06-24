import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexProductCardComponent } from './index-product-card.component';

describe('IndexProductCardComponent', () => {
  let component: IndexProductCardComponent;
  let fixture: ComponentFixture<IndexProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexProductCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
