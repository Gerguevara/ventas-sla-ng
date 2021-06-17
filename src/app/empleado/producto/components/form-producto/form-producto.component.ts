import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoPost, ProductoService } from '../../services/producto.service';
import { Categoria } from '../../../models/categoria.models';
import { PaginatorService } from '../../../../tools/services/paginator.service';
import { Producto } from '../../../../core/Models/producto.model';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class FormProductoComponent implements OnInit {

  // Tabla de categorias
  displayedColumns: string[] = ['ID', 'Nombre', 'Descripción'];
  dataSource!: MatTableDataSource<Categoria>;
  clickedRows = new Set<Categoria>();

  // URL donde se consumen los datos
  url = 'http://localhost:8000/api/categorias';

  fileInput!: File;
  generalForm: FormGroup;
  designForm: FormGroup;
  inventarioForm: FormGroup;
  imgUrl = 'http://pm1.narvii.com/6843/9cefc6c69cc18d0468cb06002678387b4c67c2f4v2_00.jpg';
  fontSizeControl = new FormControl(0, Validators.min(0));

  // Getters para validaciones
  // Aquí obtenemos el estado de validez de cada campo del formulario en métodos separados
  get nombreNoValido(): boolean | undefined {
    return this.generalForm.get('nombre')?.invalid && this.generalForm.get('nombre')?.touched;
  }
  get descripcionNoValido(): boolean | undefined {
    return this.generalForm.get('descripcion')?.invalid && this.generalForm.get('descripcion')?.touched;
  }
  get categoriaNoValido(): boolean | undefined {
    return this.generalForm.get('categoria')?.invalid && this.generalForm.get('categoria')?.touched;
  }
  get imagenNoValido(): boolean | undefined {
    return this.designForm.get('file')?.invalid;
  }
  get estadoNoValido(): boolean | undefined {
    return this.inventarioForm.get('estado')?.invalid && this.inventarioForm.get('estado')?.touched;
  }

  // Chips List
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  categorias: string[] = [];

  // Método para quitar una categoría de la tabla y del ChipList
  quitarCategoria(): void {
    this.categorias = [];
    this.clickedRows.clear();
    this.generalForm.get('categoria')?.setValue('');
  }

  // Método para añadir una categoría a la tabla y a la ChipList
  seleccionarCategoria( row: Categoria ): void {
    // Si las listas están vacías se introduce la categoría seleccionada
    if ( this.categorias.length === 0 && this.clickedRows.size === 0) {
      this.clickedRows.add( row );
      this.categorias.push( row.nombre );
      this.generalForm.get('categoria')?.setValue(row.nombre);
    }
    // Si las listas ya tienen un valor, estas se limpian y se introduce el nuevo
    else {
      this.categorias = [];
      this.clickedRows.clear();
      this.clickedRows.add( row );
      this.categorias.push( row.nombre );
      this.generalForm.get('categoria')?.setValue(row.nombre);
    }
    // De esta forma se trata de mantener solo una categoría seleccionada
  }

  constructor( private snackBar: MatSnackBar, private formBuilder: FormBuilder,
               private productoService: ProductoService,
               private paginatorService: PaginatorService ) {
    // Creación del formulario
    // Formulario general
    this.generalForm = this.formBuilder.group({
      nombre     : ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      categoria  : ['', Validators.required],
      precio     : ['0.00', [Validators.required]]
    });
    // Formulario de imagen
    this.designForm = this.formBuilder.group({
      file       : [this.fileInput, [Validators.required]],
    });
    // Formulario de inventario
    this.inventarioForm = this.formBuilder.group({
      estado     : ['1', [Validators.required]],
      cantidad   : ['0', [Validators.required]],
      unidad     : ['Items', [Validators.required]],
      precio     : ['0.00', [Validators.required]]
    });
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

  // Método para obtener mensajes de errores de validaciones Imagen
  getErrorImagenMessage(): string {
    if (this.designForm.get('file')?.hasError('required') || this.designForm.get('file')?.value === '') {
      return 'Debe insertar una imagen';
    }
    else {
      return '';
    }
  }

  insertarImagen(): void{
    this.imgUrl = this.designForm.get('file')?.value;
  }

  ngOnInit(): void {
    // Aquí nos subscribimos a todos los cambios que nos envíe el paginador con la data de la página
    this.paginatorService.pageDataChange$.subscribe((response: Categoria[]) => {
      // Seteamos estos datos a la tabla
      this.dataSource = new MatTableDataSource<Categoria>(response);
    });
  }

  // Método para hacer submit del formulario
  enviar(): void{
    if ( this.generalForm.invalid ) {
      Object.values( this.generalForm.controls ).forEach(element => {
        element.markAsTouched();
      });
      this.snackBar.open('Datos no válidos', 'Cerrar');
    } else if ( this.designForm.invalid ) {
      Object.values( this.designForm.controls ).forEach(element => {
        element.markAsTouched();
      });
      this.snackBar.open('Datos no válidos', 'Cerrar');
    } else if ( this.inventarioForm.invalid ) {
      Object.values( this.inventarioForm.controls ).forEach(element => {
        element.markAsTouched();
      });
      this.snackBar.open('Datos no válidos', 'Cerrar');
    } else {
      // console.log( this.productoForm );
      let idCategoria = 0;
      for (const categoria of this.clickedRows) {
        idCategoria = categoria.id;
      }
      const producto: ProductoPost = {
        id_categoria: idCategoria,
        nombre_producto: this.generalForm.get('nombre')?.value,
        descripcion_producto: this.generalForm.get('descripcion')?.value,
        disponibilidad: this.inventarioForm.get('estado')?.value,
        imagen: this.imgUrl,
        precio: this.generalForm.get('precio')?.value,
        cantidad: this.inventarioForm.get('cantidad')?.value
      };
      this.productoService.crearProducto(producto).subscribe((response: any) => {
        console.log(response);
        this.snackBar.open(response.mensaje, 'Cerrar');
      },
      (error: any) => {
        console.log(error);
        this.snackBar.open(error, 'Cerrar');
      });
      this.subirImagen();
    }
  }

  subirImagen(): void{
    /*try {
      const formulario = new FormData();
      formulario.append('file', this.productoForm.get('file')?.value);
      formulario.append('enctype', 'multipart/form-data');
      formulario.append('method', 'POST');
      this.productoService.subirImagen( formulario ).subscribe((response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }*/
  }

}
