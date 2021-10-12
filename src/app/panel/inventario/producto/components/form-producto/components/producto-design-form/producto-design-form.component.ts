import { ProductoService } from '@global-services/producto.service';
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-producto-design-form',
  templateUrl: './producto-design-form.component.html',
  styleUrls: ['./producto-design-form.component.scss']
})
export class ProductoDesignFormComponent implements OnInit, OnDestroy {

  designForm!: FormGroup;
  @Output() designFormOutput$ = new EventEmitter<FormGroup>();
  // Variable que almacena el nombre del archivo al ser cargado
  imgUrl = '';
  nombreArchivo = 'Seleccionar Imagen';
  textoImagen = 'Inserte una imagen';
  cargandoImagen = false;
  mostrarImagen = false;
  deshabilitarImagen = true;
  // Variable para manejo de imagen
  fileInput!: File;

  constructor(private productoService: ProductoService,
              private formBuilder: FormBuilder) {
    // Formulario de imagen
    this.designForm = this.formBuilder.group({
      fileInput  : ['', [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    this.designFormOutput$.emit(this.designForm);
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
    this.mostrarImagen = true;
    this.deshabilitarImagen = false;
    if ( this.productoService.productoChange ) {
      this.imgUrl = this.productoService.productoChange.imagen;
      this.designForm.get('fileInput')?.setValue(this.productoService.productoChange.imagen);
    }
  }

  // Se ejecuta cuando la imagen cambia
  cambioImagen( event: any ): void{
    if (event.target.files[0]){
      this.mostrarImagen = false;
      this.cargandoImagen = true;
      // Cambia el nombre del botón por el nombre del archivo
      this.nombreArchivo = event.target.files[0].name;
      this.fileInput = event.target.files[0];

      const form = new FormData();
      form.append('image', this.fileInput, this.fileInput.name);
      this.productoService.uploadImage( form ).then((response: any) => {
        console.log(response);
        this.cargandoImagen = false;
        this.imgUrl = `${environment.baseApiUrl}${response.path}`;
        this.mostrarImagen = true;
        this.designForm.get('fileInput')?.setValue(this.imgUrl);
      },
      (error: any) => {
        this.cargandoImagen = false;
        console.log(error);
      });
    }
  }

  quitarImagen(): void {
    this.productoService.deleteImage(this.imgUrl).subscribe((response: any) => {
      this.imgUrl = '';
      this.designForm.get('fileInput')?.setValue(this.imgUrl);
    },
    (error: any) => {
      console.log(error);
    });
  }

  submitDesignForm(): void {
    this.designFormOutput$.emit(this.designForm);
  }

}
