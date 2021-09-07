import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogTwoFaComponent } from './confirm-dialog-two-fa.component';

describe('ConfirmDialogTwoFaComponent', () => {
  let component: ConfirmDialogTwoFaComponent;
  let fixture: ComponentFixture<ConfirmDialogTwoFaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogTwoFaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogTwoFaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
