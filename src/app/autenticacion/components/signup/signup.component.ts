import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from '../../../core/services/validators.service';
import { LoginClienteService, SignUpResponse } from '../../../core/services/login-cliente.service';
import { DialogMessageComponent } from 'src/app/tools/components/dialog-message/dialog-message.component';
import { DialogSpinnerComponent } from 'src/app/tools/components/dialog-spinner/dialog-spinner.component';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface DialogData {
  email: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  confirmPass = new FormControl('', Validators.required);
  hide = true;

  // Getters para validaciones
  // Aquí obtenemos el estado de validez de cada campo del formulario en métodos separados
  get emailNoValido(): boolean | undefined {
    return this.signupForm.get('email')?.invalid && this.signupForm.get('email')?.touched;
  }
  get passwordNoValido(): boolean | undefined {
    return this.signupForm.get('password')?.invalid && this.signupForm.get('password')?.touched;
  }

  get password2NoValido(): boolean | undefined {
    const password1 = this.signupForm.get('password');
    const password2 = this.signupForm.get('password2');

    return ( password1 === password2 ) ? false : true;
  }

  constructor( private router: Router,
               private formBuilder: FormBuilder,
               private validadores: ValidatorsService,
               private authService: LoginClienteService,
               public dialog: MatDialog,
               private snackBar: MatSnackBar ) {
    // Creación del formulario
    this.signupForm = this.formBuilder.group({
      email    : ['', [ Validators.required, Validators.email ]],
      password : ['', [ Validators.required ]],
      password2: ['', [ Validators.required ]]
    }, {
      // Validadores personalizados
      validators: [
        this.validadores.contraseñasIguales( 'password', 'password2' ), // Validador para hacer coincidir contraseñas
        this.validadores.seguridadPassword( 'password' )                // Validador para seguridad de la contraseña
      ]
    });
  }

  ngOnInit(): void {
  }

  // Método para hacer submit del formulario
  enviar(): void{
    // Tomamos los datos del formulario
    this.openSpinner();
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    const password_confirmation = this.signupForm.get('password2')?.value;
    // Llamamos al servicio para hacer el post de la información
    this.authService.submitRegistro( email, password, password_confirmation ).subscribe(
      // Si todo sale bien, aquí se recibe la respuesta
      ( response: SignUpResponse ) => {
        localStorage.setItem('token-registro', response.token);
        this.openDialog();
      },
      // Si ocurre algún error, se imprimen en esta sección
      ( error: any ) => {
        console.log( error.error.message );
        console.log(error);
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
  }

  // Método para obtener mensajes de errores de validaciones Email
  getErrorEmailMessage(): string {
    if (this.signupForm.get('email')?.hasError('required')) {
      return 'Debe ingresar un valor';
    }

    return this.signupForm.get('email')?.hasError('email') ? 'Email no válido' : '';
  }

  // Método para obtener mensajes de errores de validaciones Password
  getErrorPassMessage(): string {
    if (this.signupForm.get('password')?.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    if (this.signupForm.get('password')?.hasError('minlength')) {
      return 'Debe tener más de 8 caracteres';
    }
    if (this.signupForm.get('password')?.hasError('pattern')) {
      return 'Contraseña no válida';
    }
    else {
      return '';
    }
  }

  // Método para obtener mensajes de errores de confirmación de Password
  getErrorConfirmPassMessage(): string {
    if (this.signupForm.get('password2')?.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    else if (this.signupForm.get('password2')?.hasError('minlength')) {
      return 'Constraseña inválida';
    }
    else if (this.signupForm.get('password') !== this.signupForm.get('password2')) {
      return 'Contraseña no coincide';
    }
    else {
      return '';
    }
  }

  // Método para mostrar el cuadro de dialogo con un mensaje
  openDialog(): void {
    // Cerramos todos los dialogos abiertos hasta el momento
    this.dialog.closeAll();
    // Abrimos el nuevo dialogo con el mensaje
    const mensaje = 'Su cuenta ha sido registrada exitósamente. Hemos enviado un correo a ' + this.signupForm.get('email')?.value + ' para que pueda realizar la verificación de su cuenta.';
    this.dialog.open( DialogMessageComponent,
                      { data: {
                          title: 'Registro de Cuenta',
                          message: mensaje,
                          redirect: '/autentication/login'
                        } } );
  }

  // Método para mostrar el spinner
  openSpinner(): void {
    this.dialog.open( DialogSpinnerComponent );
  }

  // Método para retornar a login
  return(): void {
    this.router.navigate(['/autentication/login']);
  }

}
