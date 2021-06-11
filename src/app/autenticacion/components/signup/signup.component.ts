import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from '../../services/validators.service';
import { AutenticacionService, SignUpResponse } from '../../services/autenticacion.service';

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
               private authService: AutenticacionService,
               public dialog: MatDialog ) {
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
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    const password_confirmation = this.signupForm.get('password2')?.value;
    this.authService.submitRegistro( email, password, password_confirmation ).subscribe(
      ( response: any ) => {
        console.log( response );
        this.openDialog();
      },
      ( error: any ) => {
        console.log( error );
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
    this.dialog.open( DialogElements, { data: { email: this.signupForm.get('email') } } );
  }

  // Método para retornar a login
  return(): void {
    this.router.navigate(['/autentication/login']);
  }

}

export class DialogElements {

  constructor( public dialogRef: MatDialogRef<DialogElements>,
               @Inject(MAT_DIALOG_DATA) public data: string,
               private router: Router ){}

  regresar(): void {
    this.router.navigate(['/autentication/login']);
  }
}
