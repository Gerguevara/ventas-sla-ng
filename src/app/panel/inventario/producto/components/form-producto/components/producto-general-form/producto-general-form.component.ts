import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Resultado } from '@models/resultados/resultado.model';
import { CategoriaService } from '@global-services/categoria.service';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Categoria } from '@core/models/categoria.model';

@Component({
  selector: 'app-producto-general-form',
  templateUrl: './producto-general-form.component.html',
  styleUrls: ['./producto-general-form.component.scss']
})
export class ProductoGeneralFormComponent implements OnInit {
  @Input()
  generalForm!: FormGroup;
  @Input()
  editable!: boolean;
  categoriasObservable!: Observable<Categoria[]> | Observable<Resultado<Categoria>>;
  selectable = true;
  removable = true;
  categoriasFiltradas: Observable<Categoria[]> = of<Categoria[]>([]);

  constructor(private categoriaService: CategoriaService) {
  }

  ngOnInit(): void {
    if(this.categoriaControl){
      this.categoriasFiltradas= this.categoriaControl.valueChanges.pipe(
        debounceTime(250),
        startWith(''),
        map((value: string | Categoria) => (typeof value === 'string'? value : value.nombre)),
        switchMap((name: string)=> this.getCategoriesObservable(name))
      );
    }
  }

  getCategoriesObservable(searchValue?: string): Observable<Categoria[]> {
    if(!searchValue || searchValue === ''){
      console.log('search value empty');
      this.categoriasObservable = this.categoriaService.getObjects();
      return this.categoriasObservable.pipe(
        map(( value:any )=>value.data)
      ) as Observable<Categoria[]>;
    } else if(searchValue){
      console.log('search value is not empty');
      if(searchValue !== ""){
        this.categoriasObservable = this.categoriaService.buscarCategoria(searchValue);
      }
    }
    return this.categoriasObservable as Observable<Categoria[]>;
  }

  private getControl(key: string): AbstractControl{
    if(this.generalForm){
      let control = this.generalForm.get(key);
      if(control){
        return control;
      } else {
        return new FormControl();
      }
    } else {
      return new FormControl();
    }
  }

  get nombreControl(): AbstractControl {
    return this.getControl('nombre');
  }

  get descripcionControl(): AbstractControl {
    return this.getControl('descripcion');
  }

  get categoriaControl(): AbstractControl {
    return this.getControl('categoria');
  }

  // Aquí obtenemos el estado de validez de cada campo del formulario en métodos separados
  get nombreNoValido(): boolean | undefined {
    return this.nombreControl?.invalid && this.nombreControl?.touched;
  }

  get descripcionNoValido(): boolean | undefined {
    return this.descripcionControl?.invalid && this.descripcionControl?.touched;
  }

 get categoriaNoValido(): boolean | undefined {
  return this.categoriaControl?.invalid && this.categoriaControl?.touched;
}

  // Método para obtener mensajes de errores de validaciones Nombre
  getErrorNombreMessage(): string {
    if (this.generalForm.get('nombre')?.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    else if (this.generalForm.get('nombre')?.hasError('minlength')) {
      return 'Nombre no válido';
    }
    else {
      return '';
    }
  }

  // Método para obtener mensajes de errores de validaciones Descripción
  getErrorDescripcionMessage(): string {
    if (this.generalForm.get('descripcion')?.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    else if (this.generalForm.get('descripcion')?.hasError('minlength')) {
      return 'Descripción no válido';
    }
    else {
      return '';
    }
  }

  // Método para obtener mensajes de errores de validaciones Descripción
  getErrorCategoriaMessage(): string {
    if (this.generalForm.get('categoria')?.hasError('required')) {
      return 'Debe seleccionar una categoría';
    }
    else {
      return '';
    }
  }

  displayCategoria(value: Categoria){
    return value.nombre;
  }
}
