import { Component, Inject, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PartialObserver } from 'rxjs';

import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { Departamento } from '@models/departamento.model';
import { DepartamentoService } from '@global-services/departamento.service';
import { IData } from '@tool-interfaces/DataInterface';

@Component({
  selector: 'app-departamento-details',
  templateUrl: './departamento-details.component.html',
  styleUrls: ['./departamento-details.component.scss']
})
export class DepartamentoDetailsComponent implements OnInit {
  @ViewChild("nameInput") name?: MatInput;
  @ViewChild("descriptionInput") description?: MatInput;
  editable = false;
  editableNombre = false;
  editableDescripcion = false;
  formGroup!: FormGroup;
  private editObserver: PartialObserver<{resultado:boolean,mensaje:string}> = {
    next: (result: {resultado: boolean, mensaje: string})=>this.snackBar.open(result.mensaje, 'Cerrar', {
      duration: 3000
    }),
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public context : IData<Departamento>,
    private departamentoService: DepartamentoService,
    private snackBar: MatSnackBar
    ) {
      this.formGroup = new FormGroup({
        nombre: new FormControl('', [
            Validators.required,
            Validators.maxLength(30)
        ]),
        descripcion: new FormControl('', [])
      });
    }

  ngOnInit(): void {
  }

  executeNombreEdit(name: string){
    if(name.length!=0 && name.length <= 30){
      this.context.data.nombre = name;
      this.departamentoService.updateObject(this.context.data).subscribe(this.editObserver);
    }
    this.disableNombreEdit();
  }

  executeDescripcionEdit(description: string){
    this.context.data.descripcion = description;
    this.departamentoService.updateObject(this.context.data).subscribe(this.editObserver);
    this.disableDescripcionEdit();
  }

  toggleEdit($event: MatSlideToggleChange){
    this.editable = $event.checked;
  }

  enableNombreEdit(){
    if(!this.editableDescripcion){
      this.editableNombre = true
      this.nombreControl.setValue(this.context.data.nombre);
      this.nombreControl.enable();
    } else {
      this.snackBar.open('Por favor finaliza los cambios antes de iniciar nuevos cambios',undefined,{duration: 2000})
    }
  }

  enableDescripcionEdit(){
    if(!this.editableNombre){
      this.editableDescripcion = true;
      this.descripcionControl.setValue(this.context.data.descripcion);
    } else {
      this.snackBar.open('Por favor finaliza los cambios antes de iniciar nuevos cambios',undefined,{duration: 2000})
    }
  }


  disableNombreEdit(){
    this.editableNombre = false;
  }

  disableDescripcionEdit(){
    this.editableDescripcion = false;
  }

  get nombreControl(): FormControl {
    return this.formGroup.get('nombre') as FormControl;
  }

  get descripcionControl(): FormControl {
    return this.formGroup.get('descripcion') as FormControl;
  }

  onSubmit(){
    if(this.editableNombre){
      this.executeNombreEdit(this.nombreControl.value);
    } else if(this.editableDescripcion){
      this.executeDescripcionEdit(this.descripcionControl.value);
    }
  }
}
