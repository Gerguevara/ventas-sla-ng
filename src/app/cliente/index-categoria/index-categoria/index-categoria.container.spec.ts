import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCategoriaContainer } from './index-categoria.container';

describe('IndexCategoriaContainer', () => {
  let component: IndexCategoriaContainer;
  let fixture: ComponentFixture<IndexCategoriaContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCategoriaContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCategoriaContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
