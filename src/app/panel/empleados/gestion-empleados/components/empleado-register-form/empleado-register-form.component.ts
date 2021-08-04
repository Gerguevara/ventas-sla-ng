import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

import { PerfilEmpleado } from '@core/models/perfil.empleado.model';
import { EmpleadoService } from '@global-services/empleado.service';
import { environment } from '@environments/environment';

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
    const allLettersPattern = environment.patterns.allLetters;
    const phoneNumbersPattern = environment.patterns.phoneNumber;
    const duiPatter = environment.patterns.dui;
    const nitPattern = environment.patterns.nit;
    const integerPattern = environment.patterns.integer;
    const decimalPattern = environment.patterns.decimal;
    this.accessForm = formBuilder.group(
      {
        //id: [null,[]],
        nombres: ['',[Validators.pattern(allLettersPattern)]],
        apellidos: ['',[Validators.pattern(allLettersPattern)]],
        email: ['',[Validators.email]],
      }
    );
    this.generalForm = formBuilder.group(
      {
        genero: ['',[]],
        telefono: ['',[Validators.pattern(phoneNumbersPattern)]],
        direccion: ['',[]],
        estadoCivil: ['',[]],
      }
    );
    this.documentsForm = formBuilder.group(
      {
        dui: ['',[Validators.pattern(duiPatter), Validators.maxLength(10)]],
        nit: ['',[Validators.pattern(nitPattern), Validators.maxLength(17)]],
        afp: ['',[Validators.pattern(integerPattern)]],
        isss: ['',[Validators.pattern(integerPattern)]],
      }
    );
    this.corporateForm = formBuilder.group(
      {
        nivelEstudios: ['',[]],
        salario: [0.0,[Validators.pattern(decimalPattern)]],
        fechaInicio: ['',[]],
      }
    );
  }

  ngOnInit(): void {
    let emp: PerfilEmpleado = {} as PerfilEmpleado;
    const { nombres } = emp;
    const { apellidos } = emp;
    const { email } = emp;
    const accessEmpleado = {
    }
    this.accessForm.patchValue(emp)
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
    return this.getFormData() as PerfilEmpleado;
  }
}
