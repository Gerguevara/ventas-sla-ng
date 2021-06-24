import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSolicitudesComponent } from './index-solicitudes.component';

describe('IndexSolicitudesComponent', () => {
  let component: IndexSolicitudesComponent;
  let fixture: ComponentFixture<IndexSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexSolicitudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
