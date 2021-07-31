import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ValidatorsService } from '@global-services/validators.service';
import { LoginClienteService } from '@global-services/login-cliente.service';
import { DialogMessageComponent } from '@tool-components/dialog-message/dialog-message.component';
import { DialogSpinnerComponent } from '@tool-components/dialog-spinner/dialog-spinner.component';

export interface DialogData {
  email: string;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  confirmPass = new FormControl('', Validators.required);
  hide = true;
  token = '';

  // Getters para validaciones
  // Aquí obtenemos el estado de validez de cada campo del formulario en métodos separados
  get passwordNoValido(): boolean | undefined {
    return this.resetForm.get('password')?.invalid && this.resetForm.get('password')?.touched;
  }

  get password2NoValido(): boolean | undefined {
    const password1 = this.resetForm.get('password');
    const password2 = this.resetForm.get('password2');

    return ( password1 === password2 ) ? false : true;
  }

  constructor( private router: Router,
               private formBuilder: FormBuilder,
               private activeRouter: ActivatedRoute,
               private validadores: ValidatorsService,
               private authService: LoginClienteService,
               public dialog: MatDialog,
               private snackBar: MatSnackBar ) {
    // Creación del formulario
    this.resetForm = this.formBuilder.group({
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
    this.activeRouter.params.subscribe( params => {
      this.token = params.token;
    });
  }

  // Método para hacer submit del formulario
  enviar(): void{
    this.openSpinner();
    const password = this.resetForm.get('password')?.value;
    const password_confirmation = this.resetForm.get('password2')?.value;
    this.authService.submitResetPassword( this.token,
                                          password,
                                          password_confirmation ).subscribe((response: any) => {
                                            this.dialog.closeAll();
                                            console.log(response);
                                            // Eliminamos el token del storage ya que ya no es válido
                                            localStorage.removeItem('token');
                                            // Eliminamos el email del storage
                                            localStorage.removeItem('email');
                                            // Abrimos el nuevo dialogo con el mensaje
                                            const mensaje = 'Has reestablecido tu contraseña exitósamente.';
                                            this.dialog.open( DialogMessageComponent,
                                            { data: {
                                              title: 'Reestablecer Contraseña',
                                              message: mensaje,
                                              redirect: '/autentication/login'
                                            } } );
                                          },
                                          (error: any) => {
                                            console.log(error);
                                            this.dialog.closeAll();
                                            this.snackBar.open('Ha ocurrido un error', 'Cerrar', { duration: 5000 });
                                          });
  }

  // Método para obtener mensajes de errores de validaciones Password
  getErrorPassMessage(): string {
    if (this.resetForm.get('password')?.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    if (this.resetForm.get('password')?.hasError('minlength')) {
      return 'Debe tener más de 8 caracteres';
    }
    if (this.resetForm.get('password')?.hasError('pattern')) {
      return 'Contraseña no válida';
    }
    else {
      return '';
    }
  }

  // Método para obtener mensajes de errores de confirmación de Password
  getErrorConfirmPassMessage(): string {
    if (this.resetForm.get('password2')?.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    else if (this.resetForm.get('password2')?.hasError('minlength')) {
      return 'Constraseña inválida';
    }
    else if (this.resetForm.get('password') !== this.resetForm.get('password2')) {
      return 'Contraseña no coincide';
    }
    else {
      return '';
    }
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
