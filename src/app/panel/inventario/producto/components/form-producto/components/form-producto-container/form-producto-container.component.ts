import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Categoria } from '@models/categoria.model';
import { Producto } from '@models/producto.model';
import { ProductoPost, ProductoService } from '@global-services/producto.service';

import { DialogSpinnerComponent } from '@tool-components/dialog-spinner/dialog-spinner.component';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'sla-form-producto-container',
  templateUrl: './form-producto-container.component.html',
  styleUrls: ['./form-producto-container.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class FormProductoContainerComponent implements OnInit {

  @Output()
  actualizarTabla = new EventEmitter<boolean>();
  @Output()
  insertarProducto = new EventEmitter<boolean>();

  // Valores de entrada en caso que el formulario solo sea para previsualización
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

  // URL de subida de imagenes
  urlImageUpload = `${environment.uploadUrl}`;
  // URL de lectura de imagenes
  urlImage = `${environment.uploadDir}`;

  idProductoSeleccionado!: number;

  // Declaración de los formularios
  generalForm!: FormGroup;
  designForm!: FormGroup;
  inventarioForm!: FormGroup;

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

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<FormProductoContainerComponent>) {

    this.dialogRef.disableClose = true;
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

  ngOnInit(): void { }

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

  obtenerGeneralForm( event: FormGroup ): void {
    this.generalForm = event;
  }

  obtenerDesignForm( event: FormGroup ): void {
    this.designForm = event;
  }

  obtenerInventarioForm( event: FormGroup ): void {
    this.inventarioForm = event;
  }

  cerrarFormulario(): void {
    this.router.navigate(['/panel/inventario/producto']);
    this.dialogRef.close();
  }
}
