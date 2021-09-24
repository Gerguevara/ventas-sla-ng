import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaTransaccionComponent } from './linea-transaccion.component';

describe('LineaTransaccionComponent', () => {
  let component: LineaTransaccionComponent;
  let fixture: ComponentFixture<LineaTransaccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineaTransaccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
