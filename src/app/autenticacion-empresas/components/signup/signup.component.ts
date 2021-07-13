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
  frontalPathServer = '';
  imgFrontalUrl = '';
  imgReverso!: File;
  reversoPathServer = '';
  imgReversoUrl = '';

  signupForm: FormGroup;
  frontalImagenForm: FormGroup;
  reversoImagenForm: FormGroup;
  confirmPass = new FormControl('', Validators.required);
  hide = true;

  nombreArchivoFrontal = 'Seleccionar Imagen';
  nombreArchivoReverso = 'Seleccionar Imagen';
  deshabilitarImagen = true;

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

  cambioImagenReverso( event: any ): void{
    if (event.target.files[0]) {
      this.cargandoImagenReverso = true;
      // Cambia el nombre del botón por el nombre del archivo
      this.imgReverso = event.target.files[0];
      this.nombreArchivoReverso = this.imgReverso.name;

      const form = new FormData();
      form.append('image', this.imgReverso, this.imgReverso.name);
      this.authService.uploadImage( form ).then((response: any) => {
        this.cargandoImagenReverso = false;
        this.reversoPathServer = response.path;
        this.imgReversoUrl = 'http://localhost:8000/' + response.path;
        this.reversoImagenForm.get('reversoInput')?.setValue(this.imgReversoUrl);
      },
      (error: any) => {
        this.cargandoImagenReverso = false;
        this.snackBar.open('No se pudo cargar imagen', 'Cerrar', {
          duration: 5000
        });
        console.log(error);
      });
    }
  }
  cambioImagenFrontal( event: any ): void{
    if (event.target.files[0]) {
      this.cargandoImagenFrontal = true;
      // Cambia el nombre del botón por el nombre del archivo
      this.imgFrontal = event.target.files[0];
      this.nombreArchivoFrontal = this.imgFrontal.name;

      const form = new FormData();
      form.append('image', this.imgFrontal, this.imgFrontal.name);
      this.authService.uploadImage( form ).then((response: any) => {
        this.cargandoImagenFrontal = false;
        this.frontalPathServer = response.path;
        this.imgFrontalUrl = 'http://localhost:8000/' + response.path;
        this.frontalImagenForm.get('frontalInput')?.setValue(this.imgFrontalUrl);
      },
      (error: any) => {
        this.cargandoImagenFrontal = false;
        this.snackBar.open('No se pudo cargar imagen', 'Cerrar', {
          duration: 5000
        });
        console.log(error);
      });
    }
  }

  quitarImagenFrontal(): void {
    this.authService.deleteImage(this.frontalPathServer).subscribe((response: any) => {
      console.log('eliminado');
      this.imgFrontalUrl = '';
      this.frontalImagenForm.get('frontalInput')?.setValue(this.imgFrontalUrl);
      this.nombreArchivoFrontal = 'Seleccionar Imagen';
    },
    (error: any) => {
      console.log(error);
    });
  }

  quitarImagenReverso(): void {
    this.authService.deleteImage(this.reversoPathServer).subscribe((response: any) => {
      console.log('eliminado');
      this.imgReversoUrl = '';
      this.reversoImagenForm.get('reversoInput')?.setValue(this.imgReversoUrl);
      this.nombreArchivoReverso = 'Seleccionar Imagen';
    },
    (error: any) => {
      console.log(error);
    });
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
        if ( error.error.errors.email ) {
          this.snackBar.open( 'Esta cuenta de Email ya ha sido tomada', 'Cerrar', {
            duration: 10000
          });
        } else if ( error.error.errors.name ) {
          this.snackBar.open( 'Este nombre ya ha sido registrado', 'Cerrar', {
            duration: 5000
          });
        } else {
          this.snackBar.open( error.error.message, 'Cerrar', {
            duration: 5000
          });
        }
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
