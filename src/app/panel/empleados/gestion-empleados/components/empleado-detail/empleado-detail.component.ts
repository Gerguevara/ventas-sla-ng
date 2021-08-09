import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PerfilEmpleado } from '@models/perfil.empleado.model';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '@environments/environment';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-empleado-detail',
  templateUrl: './empleado-detail.component.html',
  styleUrls: ['./empleado-detail.component.scss']
})
export class EmpleadoDetailComponent implements OnInit {
  empleadoEdited = new EventEmitter<PerfilEmpleado>();
  profileLabel = 'Perfil del empleado';
  generalLabel = 'Detalles generales del empleado';
  documentsLabel = 'Documentos del empleado';
  corporateLabel = 'Informacion corporativa del empleado';
  profileGroup: FormGroup;
  generalGroup: FormGroup;
  documentsGroup: FormGroup;
  corporateGroup: FormGroup;
  editable: boolean = false;
  globalSwitch: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public empleado: PerfilEmpleado,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EmpleadoDetailComponent>,
    ) {
      const allLettersPattern = environment.patterns.allLetters;
      const phoneNumbersPattern = environment.patterns.phoneNumber;
      const duiPatter = environment.patterns.dui;
      const nitPattern = environment.patterns.nit;
      const integerPattern = environment.patterns.integer;
      const decimalPattern = environment.patterns.decimal;
    this.profileGroup = formBuilder.group(
      {
        //id: [null,[]],
        nombres: ['',[Validators.pattern(allLettersPattern)]],
        apellidos: ['',[Validators.pattern(allLettersPattern)]],
        email: ['',[Validators.email]],
      }
    );
    this.generalGroup = formBuilder.group(
      {
        genero: ['',[]],
        telefono: ['',[Validators.pattern(phoneNumbersPattern)]],
        direccion: ['',[]],
        estadoCivil: ['',[]],
      }
    );
    this.documentsGroup = formBuilder.group(
      {
        dui: ['',[Validators.pattern(duiPatter), Validators.maxLength(10)]],
        nit: ['',[Validators.pattern(nitPattern), Validators.maxLength(17)]],
        afp: ['',[Validators.pattern(integerPattern)]],
        isss: ['',[Validators.pattern(integerPattern)]],
      }
    );
    this.corporateGroup = formBuilder.group(
      {
        estudios: ['',[]],
        salario: [0.0,[Validators.pattern(decimalPattern)]],
        inicio: ['',[]],
      }
    );
  }

  ngOnInit(): void {
  }

  toggleEdit($event: MatSlideToggleChange){
    this.editable = $event.checked;
  }

  editedFieldHandler(event: {field:string,value:string}){
    const value = {
      enumerable: true,
      configurable: true,
      writable: true,
      value: event.value,
    } as PropertyDescriptor
    Object.defineProperty(this.empleado,event.field as PropertyKey,value)
    this.empleadoEdited.emit(this.empleado);
  }
}
