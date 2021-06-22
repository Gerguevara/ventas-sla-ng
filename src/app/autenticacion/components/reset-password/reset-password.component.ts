import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from '../../../core/services/validators.service';
import { LoginClienteService } from '../../../core/services/login-cliente.service';
import { DialogMessageComponent } from 'src/app/tools/components/dialog-message/dialog-message.component';
import { DialogSpinnerComponent } from 'src/app/tools/components/dialog-spinner/dialog-spinner.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
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
    this.authService.submitResetPassword( this.token,
                                          this.resetForm.get('password')?.value,
                                          this.resetForm.get('password2')?.value ).subscribe((response: any) => {
                                            this.dialog.closeAll();
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
