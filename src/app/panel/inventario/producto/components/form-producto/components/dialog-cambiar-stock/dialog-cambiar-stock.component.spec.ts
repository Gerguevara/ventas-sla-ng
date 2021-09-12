import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCambiarStockComponent } from './dialog-cambiar-stock.component';

describe('DialogCambiarStockComponent', () => {
  let component: DialogCambiarStockComponent;
  let fixture: ComponentFixture<DialogCambiarStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCambiarStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCambiarStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
