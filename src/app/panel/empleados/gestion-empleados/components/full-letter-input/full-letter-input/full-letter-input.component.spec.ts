import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullLetterInputComponent } from './full-letter-input.component';

describe('FullLetterInputComponent', () => {
  let component: FullLetterInputComponent;
  let fixture: ComponentFixture<FullLetterInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullLetterInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullLetterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
