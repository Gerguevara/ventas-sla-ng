import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexContainer } from './index.container';

describe('IndexContainer', () => {
  let component: IndexContainer;
  let fixture: ComponentFixture<IndexContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
