import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigUsuarioContainerComponent } from './config-usuario-container.component';

describe('ConfigUsuarioContainerComponent', () => {
  let component: ConfigUsuarioContainerComponent;
  let fixture: ComponentFixture<ConfigUsuarioContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigUsuarioContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigUsuarioContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
