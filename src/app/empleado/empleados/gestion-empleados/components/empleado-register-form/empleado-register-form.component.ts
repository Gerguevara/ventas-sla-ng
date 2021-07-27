import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleado-register-form',
  templateUrl: './empleado-register-form.component.html',
  styleUrls: ['./empleado-register-form.component.scss']
})
export class EmpleadoRegisterFormComponent implements OnInit {
  accessFormGroup!: FormGroup;
  generalFormGroup!: FormGroup;
  documentsFormGroup!: FormGroup;
  corporateFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.accessFormGroup = formBuilder.group(
      {
        nombres: ['',[]],
        apellidos: ['',[]],
        email: ['',[]],
        password: ['',[]]
      }
    );
    this.generalFormGroup = formBuilder.group(
      {
        //form config
      }
    );
    this.documentsFormGroup = formBuilder.group(
      {
        //form config
      }
    );
    this.corporateFormGroup = formBuilder.group(
      {
        //form config
      }
    );
  }

  ngOnInit(): void {
  }

  submit(){}

}
