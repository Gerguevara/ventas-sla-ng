import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverTwoFaComponent } from './recover-two-fa.component';

describe('RecoverTwoFaComponent', () => {
  let component: RecoverTwoFaComponent;
  let fixture: ComponentFixture<RecoverTwoFaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverTwoFaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverTwoFaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
