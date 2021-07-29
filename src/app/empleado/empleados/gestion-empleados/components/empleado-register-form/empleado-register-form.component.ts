import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

import { Empleado } from '@models/empleado.model';
import { EmpleadoService } from '@global-services/empleado.service';

@Component({
  selector: 'app-empleado-register-form',
  templateUrl: './empleado-register-form.component.html',
  styleUrls: ['./empleado-register-form.component.scss']
})
export class EmpleadoRegisterFormComponent implements OnInit {
  accessForm!: FormGroup;
  generalForm!: FormGroup;
  documentsForm!: FormGroup;
  corporateForm!: FormGroup;
  @ViewChild('stepper')
  stepper!: MatStepper;

  constructor(
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService
  ) {
    this.accessForm = formBuilder.group(
      {
        //id: [null,[]],
        nombres: ['',[]],
        apellidos: ['',[]],
        email: ['',[]],
      }
    );
    this.generalForm = formBuilder.group(
      {
        genero: ['',[]],
        telefono: ['',[]],
        direccion: ['',[]],
        estadoCivil: ['',[]],
      }
    );
    this.documentsForm = formBuilder.group(
      {
        dui: ['',[]],
        nit: ['',[]],
        afp: ['',[]],
        isss: ['',[]],
      }
    );
    this.corporateForm = formBuilder.group(
      {
        nivelEstudios: ['',[]],
        salario: [0.0,[]],
        fechaInicio: ['',[]],
      }
    );
  }

  ngOnInit(): void {
  }

  submit(){
    this.empleadoService.postEmpleado(this.getFormEmpleado()).subscribe({
      next: () => {console.log("anadido con exito")},
      error: () => {console.log("error en el registro")},
      complete: () => {}
    })
  }

  getFormData(){
    const access = this.accessForm.getRawValue();
    const general = this.generalForm.getRawValue();
    const documents = this.documentsForm.getRawValue();
    const corporate = this.corporateForm.getRawValue();
    return Object.assign(access, general, documents, corporate);
  }

  getFormEmpleado(){
    return this.getFormData() as Empleado;
  }
}
