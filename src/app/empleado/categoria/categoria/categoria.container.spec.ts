import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaContainer } from './categoria.container';

describe('CategoriaContainer', () => {
  let component: CategoriaContainer;
  let fixture: ComponentFixture<CategoriaContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
