import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostraSolicitudComponent } from './mostra-solicitud.component';

describe('MostraSolicitudComponent', () => {
  let component: MostraSolicitudComponent;
  let fixture: ComponentFixture<MostraSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostraSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostraSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
