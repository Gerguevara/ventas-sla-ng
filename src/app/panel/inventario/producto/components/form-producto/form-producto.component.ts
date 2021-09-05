import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Categoria } from '@models/categoria.model'
import { Producto } from '@models/producto.model';
import { ProductoPost, ProductoService } from '@global-services/producto.service';

import { DialogSpinnerComponent } from '@tool-components/dialog-spinner/dialog-spinner.component';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class FormProductoComponent implements OnInit {
  @Output()
  actualizarTabla = new EventEmitter<boolean>();
  @Output()
  insertarProducto = new EventEmitter<boolean>();

  // Valores de entrada en caso que el formulario solo sea para previsualización
  nombre = '';
  descripcion = '';
  categoria = '';
  precio = '0.00';
  estado = '1';
  cantidad = '0';

  // Tabla de categorias
  displayedColumns: string[] = ['ID', 'Nombre', 'Descripción'];



  // Banderas para manejar el formulario entre edición y visualización de datos
  habilitarCrear = true;
  habilitarEditar = false;
  habilitarGuardar = false;
  habilitarCancelar = false;
  habilitarEnviar = false;
  editable = true;
  formularioLleno = false;

  // URL donde se consumen los datos
  url = `${environment.apiUrl}categorias`;
  // URL de subida de imagenes
  urlImageUpload = `${environment.uploadUrl}`;
  // URL de lectura de imagenes
  urlImage = `${environment.uploadDir}`;

  idProductoSeleccionado!: number;

  // Declaración de los formularios
  generalForm: FormGroup;
  designForm: FormGroup;
  inventarioForm: FormGroup;

  // Getters para validaciones

  get imagenNoValido(): boolean | undefined {
    return this.designForm.get('fileInput')?.invalid;
  }
  get estadoNoValido(): boolean | undefined {
    return this.inventarioForm.get('estado')?.invalid && this.inventarioForm.get('estado')?.touched;
  }

  // Atributos del Chips List
  visible = true;
  addOnBlur = true;
  categorias: string[] = [];

  limpiarFormulario(): void{
    // Se resetea toda la información que esté cargada en el formulario
    this.generalForm.reset();
    this.designForm.reset();
    this.inventarioForm.reset();
    // Aquí se carga la data inicial
    this.generalForm.setValue({
      nombre: '',
      descripcion: '',
      categoria: '',
      precio: '0.00'
    });
    this.inventarioForm.setValue({
      estado: '1',
      cantidad: '0'
    });
    this.insertarProducto.emit(true);
  }

  crearProducto(): void {
    this.editable = true;
    this.habilitarEditar = false;
    this.habilitarGuardar = false;
    this.habilitarCancelar = true;
    this.habilitarEnviar = true;
    this.formularioLleno = false;
    this.limpiarFormulario();
  }

  editarProducto(): void {
    this.habilitarEditar = false;
    this.habilitarCancelar = true;
    this.habilitarGuardar = true;
    this.habilitarEnviar = false;
    this.habilitarCrear = false;
    this.editable = true;
  }

  cancelar(): void {
    // Deshabilitamos los controles de nuevo
    this.habilitarCancelar = false;
    this.habilitarGuardar = false;
    this.habilitarCrear = true;
    this.limpiarFormulario();
  }

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private dialog: MatDialog) {
    // Creación del formulario
    // Formulario general
    this.generalForm = this.formBuilder.group({
      nombre     : [this.nombre, [Validators.required, Validators.minLength(5)]],
      descripcion: [this.descripcion, [Validators.required, Validators.minLength(5)]],
      categoria  : [this.categoria, Validators.required],
      precio     : [this.precio, [Validators.required]]
    });
    // Formulario de imagen
    this.designForm = this.formBuilder.group({
      fileInput  : ['', [Validators.required]],
    });
    // Formulario de inventario
    this.inventarioForm = this.formBuilder.group({
      estado     : [this.estado, [Validators.required]],
      cantidad   : [this.cantidad, [Validators.required]],
    });
  }


  // Método para obtener mensajes de errores de validaciones Imagen
  getErrorImagenMessage(): string {
    if (this.designForm.get('urlImagen')?.hasError('required') || this.designForm.get('urlImagen')?.value === '') {
      return 'Debe insertar una imagen';
    }
    else {
      return '';
    }
  }

  ngOnInit(): void {
    // Nos subscribimos a los cambios de los productos seleccionados de la tabla
    this.productoService.productoChange$.subscribe((data: Producto) => {
      if (this.formularioLleno) {
        this.limpiarFormulario();
      }
      this.cargarData( data );
    });
    this.crearProducto();
  }

  cargarData( data: Producto ): void{
    this.idProductoSeleccionado = data.id;
    this.generalForm.get('nombre')?.setValue(data.nombre_producto);
    this.generalForm.get('descripcion')?.setValue(data.descripcion_producto);
    this.generalForm.get('precio')?.setValue(data.precio);
    this.generalForm.get('categoria')?.setValue(data.id_categoria);
    this.productoService.obtenerCategoriaProducto( data.id_categoria ).subscribe((response: Categoria) => {

    });
    this.inventarioForm.get('estado')?.setValue(data.disponibilidad.toString());
    this.inventarioForm.get('cantidad')?.setValue(data.cantidad);
    this.formularioLleno = true;
    this.habilitarEditar = true;
  }

  // Método para hacer submit del formulario
  enviar(): void{
    if ( this.generalForm.invalid ) {
      Object.values( this.generalForm.controls ).forEach(element => {
        element.markAsTouched();
      });
      this.snackBar.open('Datos del producto inválidos', 'Cerrar', {
        duration: 5000
      });
    } else if ( this.designForm.invalid ) {
      Object.values( this.designForm.controls ).forEach(element => {
        element.markAsTouched();
      });
      this.snackBar.open('Imagen del producto inválida', 'Cerrar', {
        duration: 5000
      });
    } else if ( this.inventarioForm.invalid ) {
      Object.values( this.inventarioForm.controls ).forEach(element => {
        element.markAsTouched();
      });
      this.snackBar.open('Datos no válidos', 'Cerrar', {
        duration: 5000
      });
    } else {
      const producto: ProductoPost = {
        id_categoria: this.generalForm.get('categoria')?.value.id,
        nombre_producto: this.generalForm.get('nombre')?.value,
        descripcion_producto: this.generalForm.get('descripcion')?.value,
        disponibilidad: this.inventarioForm.get('estado')?.value,
        imagen: this.designForm.get('imagen')?.value,
        precio: this.generalForm.get('precio')?.value,
        cantidad: this.inventarioForm.get('cantidad')?.value
      };
      this.productoService.crearProducto(producto).subscribe((response: any) => {
        this.dialog.closeAll();
        this.snackBar.open(response.mensaje, 'Cerrar', {
          duration: 5000
        });
        this.actualizarTabla.emit(true);
      },
      (error: any) => {
        this.dialog.closeAll();
        console.log(error);
        this.snackBar.open(error, 'Cerrar', {
          duration: 5000
        });
      });
    }
  }

  actualizarProducto(): void{
    if ( this.generalForm.invalid ) {
      Object.values( this.generalForm.controls ).forEach(element => {
        element.markAsTouched();
      });
      this.snackBar.open('Datos no válidos', 'Cerrar', {
        duration: 5000
      });
    } else if ( this.designForm.invalid ) {
      Object.values( this.designForm.controls ).forEach(element => {
        element.markAsTouched();
      });
      this.snackBar.open('Datos no válidos', 'Cerrar', {
        duration: 5000
      });
    } else if ( this.inventarioForm.invalid ) {
      Object.values( this.inventarioForm.controls ).forEach(element => {
        element.markAsTouched();
      });
      this.snackBar.open('Datos no válidos', 'Cerrar', {
        duration: 5000
      });
    } else {
      // Abrimos el dialog del spinner
      this.dialog.open( DialogSpinnerComponent );
      const producto = {
        id: this.idProductoSeleccionado,
        id_categoria: this.generalForm.get('nombre')?.value.id,
        nombre_producto: this.generalForm.get('nombre')?.value,
        descripcion_producto: this.generalForm.get('descripcion')?.value,
        disponibilidad: this.inventarioForm.get('estado')?.value,
        imagen: this.designForm.get('imagen')?.value,
        calificacion_promedio: '',
        precio: this.generalForm.get('precio')?.value,
        cantidad: this.inventarioForm.get('cantidad')?.value
      };
      this.productoService.actualizarProducto(producto as Producto).subscribe((response: any) => {
        this.dialog.closeAll();
        this.snackBar.open(response.mensaje, 'Cerrar', {
          duration: 5000
        });
      },
      (error: any) => {
        this.dialog.closeAll();
        console.log(error);
        this.snackBar.open(error, 'Cerrar', {
          duration: 5000
        });
      });
    }
  }

}
