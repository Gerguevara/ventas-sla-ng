import { ProductoService } from '@global-services/producto.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-producto-design-form',
  templateUrl: './producto-design-form.component.html',
  styleUrls: ['./producto-design-form.component.scss']
})
export class ProductoDesignFormComponent implements OnInit {

  designForm!: FormGroup;
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
    this.imgUrl = this.productoService.productoChange.imagen;
    this.mostrarImagen = true;
  }

  // Se ejecuta cuando la imagen cambia
  cambioImagen( event: any ): void{
    if (event.target.files[0]){
      this.cargandoImagen = true;
      // Cambia el nombre del botón por el nombre del archivo
      this.nombreArchivo = event.target.files[0].name;
      this.fileInput = event.target.files[0];

      const form = new FormData();
      form.append('image', this.fileInput, this.fileInput.name);

      this.productoService.uploadImage( form ).then((response: any) => {
        this.cargandoImagen = false;
        this.imgUrl = 'http://localhost:8000/' + response.path;
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

}
