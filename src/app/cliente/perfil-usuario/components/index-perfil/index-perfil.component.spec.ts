import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPerfilComponent } from './index-perfil.component';

describe('IndexPerfilComponent', () => {
  let component: IndexPerfilComponent;
  let fixture: ComponentFixture<IndexPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
