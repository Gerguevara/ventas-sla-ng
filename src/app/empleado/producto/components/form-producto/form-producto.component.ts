import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class FormProductoComponent implements OnInit {

  colorControl = new FormControl('primary');
  fontSizeControl = new FormControl(0, Validators.min(0));

  firstFormGroup: FormGroup = new FormGroup({
    firstCtrl: new FormControl('')
  });
  secondFormGroup: FormGroup = new FormGroup({
    secondCtrl: new FormControl('')
  });

  options: FormGroup = new FormGroup({
    color: this.colorControl,
    fontSize: this.fontSizeControl,
  });

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
  }

}
