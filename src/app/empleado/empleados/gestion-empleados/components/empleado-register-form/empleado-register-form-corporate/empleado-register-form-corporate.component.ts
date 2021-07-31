import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-empleado-register-form-corporate',
  templateUrl: './empleado-register-form-corporate.component.html',
  styleUrls: ['./empleado-register-form-corporate.component.scss']
})
export class EmpleadoRegisterFormCorporateComponent implements OnInit {

  @Input()
  formGroup!: FormGroup;
  salarySteps: number;

  constructor() {
    this.salarySteps = 10;
  }

  ngOnInit(): void {
  }

  getErrorMessage(control: FormControl){
    let message = '';
    let { errors } = control;
    if(errors){
      const errorsKeys = Object.keys(errors);
      errorsKeys.forEach((key: string) => {
        const errorMessage = String(key);
        message = message.concat(`${errorMessage} `);
      });
    }
    return message;
  }

  get nivelEstudiosControl(): FormControl {
    return this.formGroup.get('nivelEstudios') as FormControl;
  }

  get salarioControl(): FormControl {
    return this.formGroup.get('salario') as FormControl;
  }

  get fechaInicioControl(): FormControl {
    return this.formGroup.get('fechaInicio') as FormControl;
  }
}
