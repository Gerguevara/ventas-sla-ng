import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ConfigTab } from '@tools/abstracts/config-tab.abstract';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'sla-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent extends ConfigTab implements OnInit {
  formGroup: FormGroup;

  constructor(
    protected formBuilder: FormBuilder,
    protected matSnackBar: MatSnackBar,
  ) {
    super(matSnackBar);
    this.formGroup = formBuilder.group(
      {
        oldPassword : [],
        newPassword : [],
        newPasswordConfirmation : [],
      }
    );
  }

  ngOnInit(): void {
  }

  submitHandler(){}

  get oldPasswordControl(): FormControl {
    return this.formGroup.get('oldPassword') as FormControl;
  }
  get newPasswordControl(): FormControl {
    return this.formGroup.get('newPassword') as FormControl;
  }
  get newPasswordConfirmationControl(): FormControl {
    return this.formGroup.get('newPasswordConfirmation') as FormControl;
  }

}
