import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-empleado-register-form-access',
  templateUrl: './empleado-register-form-access.component.html',
  styleUrls: ['./empleado-register-form-access.component.scss']
})
export class EmpleadoRegisterFormAccessComponent implements OnInit {

  @Input()
  formGroup!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  getErrorMessage(control: FormControl){
    let message = '';
    let { errors } = control;
    if(errors){
      const errorsKeys = Object.keys(errors);
      errorsKeys.forEach((key: string) => {
        const errorMessage = String(errors![key]);
        message = message.concat(`${errorMessage} `);
      });
    }
    return message;
  }

  get nombresControl(): FormControl {
    return this.formGroup.get('nombres') as FormControl;
  }

  get apellidosControl(): FormControl {
    return this.formGroup.get('apellidos') as FormControl;
  }

  get emailControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }
}
