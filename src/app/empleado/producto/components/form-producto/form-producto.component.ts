import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class FormProductoComponent implements OnInit, AfterViewInit {

  productoForm: FormGroup;
  imgUrl = 'http://pm1.narvii.com/6843/9cefc6c69cc18d0468cb06002678387b4c67c2f4v2_00.jpg';
  errorGeneralMessage = '';
  errorDesignMessage = '';
  clickedRows = new Set<PeriodicElement>();
  colorControl = new FormControl('primary');
  fontSizeControl = new FormControl(0, Validators.min(0));
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  // Getters para validaciones
  // Aquí obtenemos el estado de validez de cada campo del formulario en métodos separados
  get nombreNoValido(): boolean | undefined {
    return this.productoForm.get('nombre')?.invalid && this.productoForm.get('nombre')?.touched;
  }
  get descripcionNoValido(): boolean | undefined {
    return this.productoForm.get('descripcion')?.invalid && this.productoForm.get('descripcion')?.touched;
  }
  get categoriaNoValido(): boolean | undefined {
    return this.productoForm.get('categoria')?.invalid && this.productoForm.get('categoria')?.touched;
  }
  get imagenNoValido(): boolean | undefined {
    return this.productoForm.get('imagen')?.invalid;
  }
  get estadoNoValido(): boolean | undefined {
    return this.productoForm.get('estado')?.invalid && this.productoForm.get('estado')?.touched;
  }

  // http://pm1.narvii.com/6843/9cefc6c69cc18d0468cb06002678387b4c67c2f4v2_00.jpg

  constructor(private formBuilder: FormBuilder) {
    // Creación del formulario
    this.productoForm = this.formBuilder.group({
      nombre     : ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      categoria  : ['Herramientas', [Validators.required]],
      imagen     : [this.imgUrl, [Validators.required]],
      estado     : ['En Stock', [Validators.required]],
      cantidad   : ['0', [Validators.required]],
      unidad     : ['Items', [Validators.required]],
      precio     : ['0.00', [Validators.required]]
    });
  }

  // Método para obtener mensajes de errores de validaciones Nombre
  getErrorNombreMessage(): string {
    if (this.productoForm.get('nombre')?.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    else if (this.productoForm.get('nombre')?.hasError('minlength')) {
      this.errorGeneralMessage = 'Nombre no válido';
      return 'Nombre no válido';
    }
    else {
      this.errorGeneralMessage = '';
      return '';
    }
  }

  // Método para obtener mensajes de errores de validaciones Descripción
  getErrorDescripcionMessage(): string {
    if (this.productoForm.get('descripcion')?.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    else if (this.productoForm.get('descripcion')?.hasError('minlength')) {
      this.errorGeneralMessage = 'Descripción no válida';
      return 'Descripción no válido';
    }
    else {
      this.errorGeneralMessage = '';
      return '';
    }
  }

  // Método para obtener mensajes de errores de validaciones Imagen
  getErrorImagenMessage(): string {
    if (this.productoForm.get('imagen')?.hasError('required') || this.productoForm.get('imagen')?.value === '') {
      this.errorDesignMessage = 'Debe insertar una imagen';
      return 'Debe insertar una imagen';
    }
    else {
      this.errorDesignMessage = '';
      return '';
    }
  }

  insertarImagen(): void{
    this.imgUrl = this.productoForm.get('imagen')?.value;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Método para hacer submit del formulario
  enviar(): void{
    console.log( this.productoForm );
  }

}
