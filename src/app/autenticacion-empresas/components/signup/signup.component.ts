import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogMessageComponent } from 'src/app/tools/components/dialog-message/dialog-message.component';
import { DialogSpinnerComponent } from 'src/app/tools/components/dialog-spinner/dialog-spinner.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginEmpresasService, SignUpResponse } from '../../../core/services/login-empresas.service';
export interface DialogData {
  email: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  panelOpenState = false;
  cargandoImagenFrontal = false;
  cargandoImagenReverso = false;
  textoImagen = 'Inserte una imagen';
  imgFrontal!: File;
  imgFrontalUrl = '';
  imgReverso!: File;
  imgReversoUrl = '';

  signupForm: FormGroup;
  frontalImagenForm: FormGroup;
  reversoImagenForm: FormGroup;
  confirmPass = new FormControl('', Validators.required);
  hide = true;

  nombreArchivoFrontal = 'Seleccionar Imagen';
  nombreArchivoReverso = 'Seleccionar Imagen';
  urlImageUpload = 'http://dr17010pdm115.000webhostapp.com/upload.php';
  urlImage = 'http://dr17010pdm115.000webhostapp.com/images/';
  deshabilitarImagen = true;
  hash = this.getRandomString(10);

  // Getters para validaciones
  // Aquí obtenemos el estado de validez de cada campo del formulario en métodos separados
  get emailNoValido(): boolean | undefined {
    return this.signupForm.get('email')?.invalid && this.signupForm.get('email')?.touched;
  }
  get nombreNoValido(): boolean | undefined {
    return this.signupForm.get('nombre')?.invalid && this.signupForm.get('nombre')?.touched;
  }
  get imgFrontalNoValido(): boolean | undefined {
    return this.frontalImagenForm.get('frontalInput')?.invalid && this.frontalImagenForm.get('frontalInput')?.touched;
  }
  get imgReversoNoValido(): boolean | undefined {
    return this.reversoImagenForm.get('reversoInput')?.invalid && this.reversoImagenForm.get('reversoInput')?.touched;
  }

  constructor( private router: Router,
               private formBuilder: FormBuilder,
               private authService: LoginEmpresasService,
               public dialog: MatDialog,
               private snackBar: MatSnackBar ) {
    // Creación del formulario
    this.signupForm = this.formBuilder.group({
      nombre   : ['', Validators.required],
      email    : ['', [ Validators.required, Validators.email ]],
    });
    this.frontalImagenForm = this.formBuilder.group({
      frontalInput: ['', Validators.required],
    });
    this.reversoImagenForm = this.formBuilder.group({
      reversoInput: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  // Función para crear el hash de la imagen y evitar nombres de archivos repetidos
  getRandomString( length: number ): string {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for ( let i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  cargarImagenFrontal( form: any ): void{
    if (this.imgFrontal) {
      this.cargandoImagenFrontal = true;
      this.hash = this.getRandomString(10);
      // Hace el post para subir la imagen enviando el formulario
      this.authService.subirImagen( form, this.hash ).subscribe((response: any) => {
      // Si todo sale bien, se crea la URL de la imagen
      this.imgFrontalUrl = this.urlImage + this.hash + '_' + this.nombreArchivoFrontal;
      this.frontalImagenForm.get('frontalInput')?.setValue(this.imgFrontalUrl);
      // No pude hacer que el servidor retorne la ruta de la imagen por razones que desconozco
      // Por dicho motivo la estoy construyendo aquí
      this.cargandoImagenFrontal = false;
      },
      (error: any) => {
        this.snackBar.open('No se pudo cargar imagen', 'Cerrar', {
          duration: 5000
        });
        this.cargandoImagenFrontal = false;
      });
    } else {
      this.snackBar.open('Debe seleccionar una imagen', 'Cerrar', {
        duration: 5000
      });
    }
  }
  cargarImagenReverso( form: any ): void{
    if (this.imgReverso) {
      this.cargandoImagenReverso = true;
      this.hash = this.getRandomString(10);
      // Hace el post para subir la imagen enviando el formulario
      this.authService.subirImagen( form, this.hash ).subscribe((response: any) => {
        // Si todo sale bien, se crea la URL de la imagen
        this.imgReversoUrl = this.urlImage + this.hash + '_' + this.nombreArchivoReverso;
        this.reversoImagenForm.get('reversoInput')?.setValue(this.imgReversoUrl);
        // No pude hacer que el servidor retorne la ruta de la imagen por razones que desconozco
        // Por dicho motivo la estoy construyendo aquí
        this.cargandoImagenReverso = false;
      },
      (error: any) => {
        this.snackBar.open('No se pudo cargar imagen', 'Cerrar', {
          duration: 5000
        });
        this.cargandoImagenReverso = false;
      });
    } else {
      this.snackBar.open('Debe seleccionar una imagen', 'Cerrar', {
        duration: 5000
      });
    }
  }

  cambioImagenFrontal( event: any ): void{
    if (event.target.files[0]) {
      // Cambia el nombre del botón por el nombre del archivo
      this.imgFrontal = event.target.files[0];
      this.nombreArchivoFrontal = this.imgFrontal.name;
    }
  }
  cambioImagenReverso( event: any ): void{
    if (event.target.files[0]) {
      // Cambia el nombre del botón por el nombre del archivo
      this.imgReverso = event.target.files[0];
      this.nombreArchivoReverso = this.imgReverso.name;
    }
  }

  // Método para hacer submit del formulario
  enviar(): void{
    // Tomamos los datos del formulario
    this.openSpinner();
    if (this.imgFrontalUrl.length > 0 && this.imgReversoUrl.length > 0) {
      const nombre = this.signupForm.get('nombre')?.value;
      const email = this.signupForm.get('email')?.value;
      // Llamamos al servicio para hacer el post de la información
      this.authService.submitRegistro( nombre, email, this.imgFrontalUrl, this.imgReversoUrl ).subscribe(
      // Si todo sale bien, aquí se recibe la respuesta
      ( response: SignUpResponse ) => {
        this.openDialog(response.mensaje);
      },
      // Si ocurre algún error, se imprimen en esta sección
      ( error: any ) => {
        console.log( error );
        this.dialog.closeAll();
        this.snackBar.open( error.error.message, 'Cerrar', {
          duration: 5000
        });
      });
    } else {
      this.dialog.closeAll();
      this.snackBar.open( 'Debe insertar las imágenes', 'Cerrar', {
        duration: 5000
      });
    }
  }

  // Método para obtener mensajes de errores de validaciones Email
  getErrorEmailMessage(): string {
    if (this.signupForm.get('email')?.hasError('required')) {
      return 'Debe ingresar un valor';
    }

    return this.signupForm.get('email')?.hasError('email') ? 'Email no válido' : '';
  }
  getErrorNombreMessage(): string {
    if (this.signupForm.get('nombre')?.hasError('required')) {
      return 'Debe ingresar un valor';
    } else {
      return '';
    }
  }

  getErrorFrontalImageMessage(): string {
    if (this.frontalImagenForm.get('frontalInput')?.hasError('required')) {
      return 'Debe insertar una imagen';
    } else {
      return '';
    }
  }
  getErrorReversoImageMessage(): string {
    if (this.reversoImagenForm.get('reversoInput')?.hasError('required')) {
      return 'Debe insertar una imagen';
    } else {
      return '';
    }
  }

  // Método para mostrar el cuadro de dialogo con un mensaje
  openDialog(mensaje: string): void {
    // Cerramos todos los dialogos abiertos hasta el momento
    this.dialog.closeAll();
    this.dialog.open( DialogMessageComponent,
                      { data: {
                          title: 'Registro de Cuenta',
                          message: mensaje,
                          redirect: '/enterprise/login'
                        } } );
  }

  // Método para mostrar el spinner
  openSpinner(): void {
    this.dialog.open( DialogSpinnerComponent );
  }

  // Método para retornar a login
  return(): void {
    this.router.navigate(['/enterprise/login']);
  }

}
