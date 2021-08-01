import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Departamento } from '@models/departamento.model';
import { FormCategoriaComponent } from '@panel/inventario/categoria/components/form-categoria/form-categoria.component';

@Component({
  selector: 'app-departamento-form',
  templateUrl: './departamento-form.component.html',
  styleUrls: ['./departamento-form.component.scss']
})
export class DepartamentoFormComponent implements OnInit {
  formGroup! : FormGroup;
  formTitle : string = "Nuevo departamento";

  constructor(
    @Inject(MAT_DIALOG_DATA) public departamento : Departamento,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormCategoriaComponent, Departamento>
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
    if(this.departamento){
      this.formTitle = `Editando ${this.departamento.nombre}`;
      this.formGroup.patchValue(this.departamento);
    }
  }

  inicializarForm(){
    this.formGroup = this.formBuilder.group(
      {
        id:[null],
        nombre: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
        descripcion: [null]
      }
    )
  }

  onSubmit(){
    //ejecutar close, enviandole los valores del form
    this.close(this.formGroup.getRawValue());
  }

  //puede que no reciba datos si el usuario no envia nada
  close(departamento?: Departamento): void {
    //cierra el dialogo enviando el producto
    this.dialogRef.close(departamento);
  }

  get nombreControl(): FormControl {
    return this.formGroup.get('nombre') as FormControl;
  }

  get descripcionControl(): FormControl {
    return this.formGroup.get('descripcion') as FormControl;
  }
}
