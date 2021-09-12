import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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

  // Tabla de categorias
  displayedColumns: string[] = ['ID', 'Nombre', 'Descripción'];

  // Banderas para manejar el formulario entre edición y visualización de datos
  habilitarEditar = false;
  habilitarGuardar = false;
  habilitarCancelar = false;
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

  // Atributos del Chips List
  visible = true;
  addOnBlur = true;
  categorias: string[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private productoService: ProductoService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<FormProductoContainerComponent>) {

    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    const data = this.productoService.productoChange;
    if ( data ) {
      this.idProductoSeleccionado = data.id;
    }
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
        imagen: this.designForm.get('fileInput')?.value,
        precio: this.generalForm.get('precio')?.value,
        cantidad: this.inventarioForm.get('cantidad')?.value
      };
      this.productoService.crearProducto(producto).subscribe((response: any) => {
        this.dialog.closeAll();
        this.limpiarObjeto();
        this.snackBar.open(response.mensaje, 'Cerrar', {
          duration: 5000
        });
        this.actualizarTabla.emit(true);
      },
      (error: any) => {
        this.dialog.closeAll();
        this.limpiarObjeto();
        console.log(error);
        this.snackBar.open('Ah ocurrido un error!', 'Cerrar', {
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
        id_categoria: this.generalForm.get('categoria')?.value.id,
        nombre_producto: this.generalForm.get('nombre')?.value,
        descripcion_producto: this.generalForm.get('descripcion')?.value,
        disponibilidad: this.inventarioForm.get('estado')?.value,
        imagen: this.designForm.get('fileInput')?.value,
        calificacion_promedio: '',
        precio: this.generalForm.get('precio')?.value,
        cantidad: this.inventarioForm.get('cantidad')?.value
      };
      this.productoService.actualizarProducto(producto as Producto).subscribe((response: any) => {
        this.dialog.closeAll();
        this.limpiarObjeto();
        this.router.navigate(['/panel/inventario/producto']);
        this.snackBar.open(response.mensaje, 'Cerrar', {
          duration: 5000
        });
      },
      (error: any) => {
        this.dialog.closeAll();
        this.limpiarObjeto();
        console.log(error);
        this.router.navigate(['/panel/inventario/producto']);
        this.snackBar.open(error, 'Cerrar', {
          duration: 5000
        });
      });
    }
  }

  /**
   * @ngdoc method
   * @name enviarDatos
   * @description
   * Es disparado al presionar el botón de Enviar en el formulario. Se encarga de evaluar si el producto
   * es creado editado a través de una bandera (enableFormFlag), y creará o actualizará el producto
   * según corresponda
   */
  enviarDatos(): void {
    if ( this.productoService.enableFormFlag ) {
      this.enviar();
    } else {
      this.actualizarProducto();
    }
  }

  /**
   * --------------------------------------------------------------------------------------------------
   */

  /**
   * Toda esta sección posee tres métodos con el mismo propósito. Todos son métodos ejecutados a través
   * de un evento en su componente respectivo del formulario. Es decir, que cuando una sección del for-
   * mulario es llenada, esta manda toda su información y cada método declarado aquí se encarga de reco-
   * ger ese evento con la información ingresada. Luego setea esa información al objeto Producto decla-
   * rado en el servicio el cual sirve para mantener los datos persistentes mientras el formulario es
   * editado.
   */
  obtenerGeneralForm( event: FormGroup ): void {
    this.generalForm = event;
    // Asignación de valores al servicio
    this.productoService.productoChange.nombre_producto = this.generalForm.get('nombre')?.value;
    this.productoService.productoChange.descripcion_producto = this.generalForm.get('descripcion')?.value;
    this.productoService.productoChange.id_categoria = this.generalForm.get('categoria')?.value.id;
    this.productoService.productoChange.precio = this.generalForm.get('precio')?.value;
  }

  obtenerDesignForm( event: FormGroup ): void {
    this.designForm = event;
    this.productoService.productoChange.imagen = event.get('fileInput')?.value;
  }

  obtenerInventarioForm( event: FormGroup ): void {
    this.inventarioForm = event;
  }

  /**
   * -------------------------------------------------------------------------------------------------
   */

  /**
   * @ngdoc method
   * @name cerrarFormulario
   * @description
   * Se encarga de realizar el cierre correcto del formulario, redireccionando al usuario
   * al index de productos y limpiando el objeto Producto que se estaba presentando en el
   * formulario.
   * @returns void
   */
  cerrarFormulario(): void {
    this.router.navigate(['/panel/inventario/producto']);
    this.limpiarObjeto();
    this.dialogRef.close();
  }

  /**
   * @ngdoc method
   * @name cambiarStock
   * @description
   * Método que se encargará de abrir una ventana modal con el componente
   * encargado del cambio del stock del producto seleccionado
   * @returns void
   */
  cambiarStock(): void {

  }

  /**
   * @ngdoc method
   * @name limpiarObjeto
   * @description
   * Método que reestablece todos los valores del objeto Producto en el servicio
   * de Productos. Esta acción es necesaria cuando el formulario se cierra o se
   * destruye
   * @returns void
   */
  limpiarObjeto(): void {
    this.productoService.productoChange.nombre_producto = '';
    this.productoService.productoChange.descripcion_producto = '';
    this.productoService.productoChange.calificacion_promedio = '';
    this.productoService.productoChange.disponibilidad = 0;
    this.productoService.productoChange.cantidad = 0;
    this.productoService.productoChange.imagen = '';
    this.productoService.productoChange.precio = '0.00';
    this.productoService.productoChange.id = 0;
    this.productoService.productoChange.id_categoria = 1;
    this.productoService.enableFormFlag = false;
  }
}
