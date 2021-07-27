import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-empleado-register-form-documents',
  templateUrl: './empleado-register-form-documents.component.html',
  styleUrls: ['./empleado-register-form-documents.component.scss']
})
export class EmpleadoRegisterFormDocumentsComponent implements OnInit {

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
