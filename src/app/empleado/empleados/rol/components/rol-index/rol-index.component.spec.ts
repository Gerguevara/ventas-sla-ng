import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolIndexComponent } from './rol-index.component';

describe('RolIndexComponent', () => {
  let component: RolIndexComponent;
  let fixture: ComponentFixture<RolIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
