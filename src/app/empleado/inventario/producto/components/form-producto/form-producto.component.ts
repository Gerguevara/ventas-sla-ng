import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Categoria } from 'src/app/core/Models/categoria.model'
import { Producto } from 'src/app/core/Models/producto.model';

import { DialogSpinnerComponent } from 'src/app/tools/components/dialog-spinner/dialog-spinner.component';
import { ProductoPost, ProductoService } from 'src/app/core/services/producto.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class FormProductoComponent implements OnInit {

  // Valores de entrada en caso que el formulario solo sea para previsualización
  nombre = '';
  descripcion = '';
  categoria = '';
  precio = '0.00';
  estado = '1';
  cantidad = '0';

  // Tabla de categorias
  displayedColumns: string[] = ['ID', 'Nombre', 'Descripción'];
  dataSource!: MatTableDataSource<Categoria>;
  filasSeleccionadas = new Set<Categoria>();

  // Banderas para manejar el formulario entre edición y visualización de datos
  habilitarCrear = true;
  habilitarEditar = false;
  habilitarGuardar = false;
  habilitarCancelar = false;
  habilitarEnviar = false;
  editable = false;
  deshabilitarImagen = true;
  formularioLleno = false;
  cargandoImagen = false;

  // URL donde se consumen los datos
  url = `${environment.apiUrl}categorias`;
  // URL de subida de imagenes
  urlImageUpload = `${environment.uploadUrl}`;
  // URL de lectura de imagenes
  urlImage = `${environment.uploadDir}`;
  // Variable que almacena el nombre del archivo al ser cargado
  nombreArchivo = 'Seleccionar Imagen';
  textoImagen = 'Inserte una imagen';

  idProductoSeleccionado!: number;

  // Variable para manejo de imagen
  fileInput!: File;
  // Declaración de los formularios
  generalForm: FormGroup;
  designForm: FormGroup;
  inventarioForm: FormGroup;
  // imgUrl = 'http://pm1.narvii.com/6843/9cefc6c69cc18d0468cb06002678387b4c67c2f4v2_00.jpg';
  imgUrl = '';
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
    return this.designForm.get('fileInput')?.invalid;
  }
  get estadoNoValido(): boolean | undefined {
    return this.inventarioForm.get('estado')?.invalid && this.inventarioForm.get('estado')?.touched;
  }

  // Atributos del Chips List
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  categorias: string[] = [];


  // Método para quitar una categoría de la tabla y del ChipList
  quitarCategoria(): void {
    if (this.editable) {
      this.categorias = [];
      this.filasSeleccionadas.clear();
      this.generalForm.get('categoria')?.setValue('');
    }
  }

  limpiarFormulario(): void{
    // Se resetea toda la información que esté cargada en el formulario
    this.generalForm.reset();
    this.designForm.reset();
    this.inventarioForm.reset();
    this.categorias = [];
    this.filasSeleccionadas.clear();
    this.generalForm.get('categoria')?.setValue('');
    this.imgUrl = '';
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
  }

  crearProducto(): void {
    this.habilitarEditar = false;
    this.editable = true;
    this.habilitarGuardar = false;
    this.habilitarCancelar = true;
    this.habilitarEnviar = true;
    this.deshabilitarImagen = false;
    this.formularioLleno = false;
    this.deshabilitarImagen = false;
    this.editable = true;
    this.generalForm.enable();
    this.designForm.enable();
    this.inventarioForm.enable();
    this.limpiarFormulario();
  }

  editarProducto(): void {
    this.habilitarEditar = false;
    this.habilitarCancelar = true;
    this.habilitarGuardar = true;
    this.habilitarEnviar = false;
    this.habilitarCrear = false;
    this.deshabilitarImagen = false;
    this.editable = true;
    this.generalForm.enable();
    this.designForm.enable();
    this.inventarioForm.enable();
  }

  cancelar(): void {
    // Deshabilitamos los controles de nuevo
    this.habilitarCancelar = false;
    this.editable = false;
    this.habilitarGuardar = false;
    this.habilitarCrear = true;
    this.deshabilitarImagen = true;
    this.generalForm.disable();
    this.designForm.disable();
    this.inventarioForm.disable();
    if (this.formularioLleno) {
      this.habilitarEditar = true;
    } else {
      this.habilitarEditar = false;
    }
  }

  // Método para añadir una categoría a la tabla y a la ChipList
  seleccionarCategoria( row: Categoria ): void {
    // Primero validamos si el formulario es habilitarEditar
    if (this.editable) {
      // Si las listas están vacías se introduce la categoría seleccionada
      if ( this.categorias.length === 0 && this.filasSeleccionadas.size === 0) {
        this.filasSeleccionadas.add( row );
        this.categorias.push( row.nombre );
        this.generalForm.get('categoria')?.setValue(row.nombre);
      }
      // Si las listas ya tienen un valor, estas se limpian y se introduce el nuevo
      else {
        this.categorias = [];
        this.filasSeleccionadas.clear();
        this.filasSeleccionadas.add( row );
        this.categorias.push( row.nombre );
        this.generalForm.get('categoria')?.setValue(row.nombre);
      }
    }
    // De esta forma se trata de mantener solo una categoría seleccionada
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
    if (this.designForm.get('urlImagen')?.hasError('required') || this.designForm.get('urlImagen')?.value === '') {
      return 'Debe insertar una imagen';
    }
    else {
      return '';
    }
  }

  // Se ejecuta al dar click en Insertar
  cargarImagen(  ): void{
    let imageControl = this.designForm.get("fileInput")?.value;
    this.cargandoImagen = true;
    // Hace el post para subir la imagen enviando el formulario
    this.productoService.subirImagen( imageControl ).subscribe({
      next: (response: any) => {
      // Si todo sale bien, se crea la URL de la imagen
      this.imgUrl = response.url;
      // No pude hacer que el servidor retorne la ruta de la imagen por razones que desconozco
      // Por dicho motivo la estoy construyendo aquí
      this.cargandoImagen = false;
      },
      error: (error: any) => {
        console.log(error);
        this.imgUrl = '';
        this.designForm.get('fileInput')?.setValue('');
        this.snackBar.open('No se pudo cargar imagen', 'Cerrar', {
          duration: 5000
        });
        this.cargandoImagen = false;
      }
    });
  }

  // Se ejecuta cuando la imagen cambia
  cambioImagen( event: any ): void{
    if(event.target.files[0]){
      // Cambia el nombre del botón por el nombre del archivo
      this.nombreArchivo = event.target.files[0].name;
      // Establece el valor del input del formulario en el archivo que se está recibiendo
      this.designForm.get('fileInput')?.setValue(event.target.files[0]);
    }
  }

  /* Método para obtener una cadena string aleatoria para evitar guardar
  imagenes con el mismo nombre en el servidor */
  getRandomString( length: number ): string {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for ( let i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  ngOnInit(): void {
    // Deshabilitar todos los controles al cargar la pantalla
    this.generalForm.disable();
    this.designForm.disable();
    this.inventarioForm.disable();
    // Nos subscribimos a los cambios de los productos seleccionados de la tabla
    this.productoService.productoChange$.subscribe((data: Producto) => {
      if (this.formularioLleno) {
        this.limpiarFormulario();
      }
      this.cargarData( data );
    });
  }

  cargarData( data: Producto ): void{
    this.idProductoSeleccionado = data.id;
    this.setImagenEdit(data.imagen);
    this.generalForm.get('nombre')?.setValue(data.nombre_producto);
    this.generalForm.get('descripcion')?.setValue(data.descripcion_producto);
    this.generalForm.get('precio')?.setValue(data.precio);
    this.generalForm.get('categoria')?.setValue(data.id_categoria);
    this.imgUrl = data.imagen;
    this.productoService.obtenerCategoriaProducto( data.id_categoria ).subscribe((response: any) => {
      this.filasSeleccionadas.add(response);
      this.categorias.push(response.nombre);
    });
    this.inventarioForm.get('estado')?.setValue(data.disponibilidad.toString());
    this.inventarioForm.get('cantidad')?.setValue(data.cantidad);
    this.formularioLleno = true;
    this.habilitarEditar = true;
  }

  setImagenEdit(url : string){
    this.productoService.obtenerImagen(url).then(
      (respuesta)=>{
        this.designForm.get('fileInput')?.setValue(respuesta);
        this.nombreArchivo = respuesta.name;
      },
    )
  }

  // Obtenemos todos los cambios que nos envíe el paginador con la data de la página
  addDataToTable( event: Categoria[] ): void {
    // Seteamos estos datos a la tabla
    this.dataSource = new MatTableDataSource<Categoria>(event);
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
      // Abrimos el dialog del spinner
      this.dialog.open( DialogSpinnerComponent );
      // console.log( this.productoForm );
      let idCategoria = 0;
      if(this.filasSeleccionadas.size>0){
        for (const categoria of this.filasSeleccionadas) {
          idCategoria = categoria.id;
        }
      } else {
        idCategoria = 1;
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
        this.dialog.closeAll();
        console.log(response);
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

  actualizarProducto(): void{
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
      // Abrimos el dialog del spinner
      this.dialog.open( DialogSpinnerComponent );
      let idCategoria = 0;
      for (const categoria of this.filasSeleccionadas) {
        idCategoria = categoria.id;
      }
      const producto = {
        id: this.idProductoSeleccionado,
        id_categoria: idCategoria,
        nombre_producto: this.generalForm.get('nombre')?.value,
        descripcion_producto: this.generalForm.get('descripcion')?.value,
        disponibilidad: this.inventarioForm.get('estado')?.value,
        imagen: this.imgUrl,
        calificacion_promedio: '',
        precio: this.generalForm.get('precio')?.value,
        cantidad: this.inventarioForm.get('cantidad')?.value
      };
      this.productoService.actualizarProducto(producto as Producto).subscribe((response: any) => {
        this.dialog.closeAll();
        console.log(response);
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