import { Resultado } from './../../../../core/Models/resultado.model';
import { CategoriaService } from './../../../../core/services/categoria.service';
import { Categoria } from './../../../models/categoria.models';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Etiqueta } from './../../../../core/Models/etiqueta.model';
import { FormCategoriaComponent } from 'src/app/empleado/categoria/components/form-categoria/form-categoria.component';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-form-etiqueta',
  templateUrl: './form-etiqueta.component.html',
  styleUrls: ['./form-etiqueta.component.scss']
})
export class FormEtiquetaComponent implements OnInit {
  formGroup! : FormGroup;
  filteredCategories: Observable<Categoria[]> = of<Categoria[]>([]);
  categorias : Categoria[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public etiqueta : Etiqueta,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormCategoriaComponent, Etiqueta>,
    private categoriaService : CategoriaService
    ) { }

  ngOnInit(): void {
    this.inicializarForm();
    this.categoriaService.getObjects().subscribe( (result : Resultado<Categoria>) => {
      this.categorias = result.data;
      /*if(this.product) {
        const categoriaProducto = this.ListaCategorias.find((categoria : Category)=>categoria.id === this.product.category.id);
        this.categoryControl.setValue(categoriaProducto);
      }*/
    });
    //pipe para cambios de valores
    this.filteredCategories = this.categoriaControl.valueChanges.pipe(
      startWith(''),
      //si el valor recibido es string entonces usarlo, sino es objeto, usar su nombre
      map((value) => (typeof value === 'string' ? value : value.nombre)),
      //filtrar categorias por el nombre recibido, sino retornarlo todo
      map((name) => (name ? this.filterCategories(name, this.categorias) : this.categorias.slice()))
    );
    if(this.etiqueta){
      this.formGroup.patchValue(this.etiqueta);
    }
  }

  inicializarForm(){
    this.formGroup = this.formBuilder.group(
      {
        id:[null],
        categoria_id: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
        nombre: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
        descripcion: [null]
      }
    )
  }

  //define que se mostrara en los autocomplete
  displayFn(etiqueta: Etiqueta): string {
    //si etiqueta existe, y su propiedad nombre tambien, entonces devolver nombre, caso contrario devolver ''
    return etiqueta && etiqueta.nombre ? etiqueta.nombre : '';
  }

  onSubmit(){
    //ejecutar close, enviandole los valores del form
    this.close(this.formGroup.getRawValue());
  }

  //puede que no reciba datos si el usuario no envia nada
  close(etiqueta?: Etiqueta): void {
    //cierra el dialogo enviando el producto
    this.dialogRef.close(etiqueta);
  }


  //filtrar categorias, recibe un valor a buscar y un arreglo donde buscar, retorna un arreglo filtrado
  private filterCategories(valor: string, categorias: Categoria[] ): Categoria[] {
    const filterValue = valor.toLowerCase();
    return categorias.filter((categoria) => (categoria.nombre.toLowerCase().includes(filterValue))
    );
  }

  get nombreControl(): FormControl {
    return this.formGroup.get('nombre') as FormControl;
  }

  get categoriaControl(): FormControl {
    return this.formGroup.get('categoria_id') as FormControl;
  }

  get descripcionControl(): FormControl {
    return this.formGroup.get('descripcion') as FormControl;
  }
}
