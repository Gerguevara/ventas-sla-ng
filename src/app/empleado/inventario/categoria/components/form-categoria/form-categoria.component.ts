import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/core/Models/categoria.model';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.scss']
})
export class FormCategoriaComponent implements OnInit {
  formGroup! : FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public categoria : Categoria,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormCategoriaComponent, Categoria>
    ) { }

  ngOnInit(): void {
    this.inicializarForm();
    if(this.categoria){
      this.formGroup.patchValue(this.categoria);
    }
  }

  inicializarForm(){
    this.formGroup = this.formBuilder.group(
      {
        id:[null],
        nombre: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
        descripcion: [null]
      }
    )
  }

  onSubmit(){
    //ejecutar close, enviandole los valores del form
    this.close(this.formGroup.getRawValue());
  }

  //puede que no reciba datos si el usuario no envia nada
  close(categoria?: Categoria): void {
    //cierra el dialogo enviando el producto
    this.dialogRef.close(categoria);
  }

  get nombreControl(): FormControl {
    return this.formGroup.get('nombre') as FormControl;
  }

  get descripcionControl(): FormControl {
    return this.formGroup.get('descripcion') as FormControl;
  }

}
