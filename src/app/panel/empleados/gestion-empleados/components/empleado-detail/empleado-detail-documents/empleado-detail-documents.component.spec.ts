import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoDetailDocumentsComponent } from './empleado-detail-documents.component';

describe('EmpleadoDetailDocumentsComponent', () => {
  let component: EmpleadoDetailDocumentsComponent;
  let fixture: ComponentFixture<EmpleadoDetailDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoDetailDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoDetailDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
