import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { ValidatorsService } from '@global-services/validators.service';
import { LoginEmpresasService } from '@global-services/login-empresas.service';
import { DialogSpinnerComponent } from '@tool-components/dialog-spinner/dialog-spinner.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePassForm: FormGroup;
  confirmPass = new FormControl('', Validators.required);
  hide = true;
  token = '';

  // Getters para validaciones
  // Aquí obtenemos el estado de validez de cada campo del formulario en métodos separados
  get passwordNoValido(): boolean | undefined {
    return this.changePassForm.get('password')?.invalid && this.changePassForm.get('password')?.touched;
  }

  get password2NoValido(): boolean | undefined {
    const password1 = this.changePassForm.get('password');
    const password2 = this.changePassForm.get('password2');

    return ( password1 === password2 ) ? false : true;
  }

  constructor( private router: Router,
               private formBuilder: FormBuilder,
               private validadores: ValidatorsService,
               public dialog: MatDialog,
               private auth: LoginEmpresasService )
  {
    // Creación del formulario
    this.changePassForm = this.formBuilder.group({
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

  enviar(): void {
    this.dialog.open( DialogSpinnerComponent );
    const pass = this.changePassForm.get('password')?.value;
    const pass2 = this.changePassForm.get('password2')?.value;
    this.auth.firstPasswordChange( pass, pass2 ).subscribe((response: any) => {
      this.dialog.closeAll();
      console.log(response);
      const changePassToken = localStorage.getItem('change-password');
      if (changePassToken) {
        localStorage.setItem('token', changePassToken);
        localStorage.removeItem('change-password');
      }
      this.router.navigate(['/']);
    },
    (error: any) => {
      this.dialog.closeAll();
      console.log(error);
    });
  }

  return(): void {
    localStorage.removeItem('change-password');
    this.router.navigate(['/']);
  }

  // Método para obtener mensajes de errores de validaciones Password
  getErrorPassMessage(): string {
    if (this.changePassForm.get('password')?.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    if (this.changePassForm.get('password')?.hasError('minlength')) {
      return 'Debe tener más de 8 caracteres';
    }
    if (this.changePassForm.get('password')?.hasError('pattern')) {
      return 'Contraseña no válida';
    }
    else {
      return '';
    }
  }

  // Método para obtener mensajes de errores de confirmación de Password
  getErrorConfirmPassMessage(): string {
    if (this.changePassForm.get('password2')?.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    else if (this.changePassForm.get('password2')?.hasError('minlength')) {
      return 'Constraseña inválida';
    }
    else if (this.changePassForm.get('password') !== this.changePassForm.get('password2')) {
      return 'Contraseña no coincide';
    }
    else {
      return '';
    }
  }

}
