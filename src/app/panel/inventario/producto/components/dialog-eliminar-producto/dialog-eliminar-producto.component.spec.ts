import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEliminarProductoComponent } from './dialog-eliminar-producto.component';

describe('DialogEliminarProductoComponent', () => {
  let component: DialogEliminarProductoComponent;
  let fixture: ComponentFixture<DialogEliminarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEliminarProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEliminarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
