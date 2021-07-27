import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleado-register-form-general',
  templateUrl: './empleado-register-form-general.component.html',
  styleUrls: ['./empleado-register-form-general.component.scss']
})
export class EmpleadoRegisterFormGeneralComponent implements OnInit {

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

}
