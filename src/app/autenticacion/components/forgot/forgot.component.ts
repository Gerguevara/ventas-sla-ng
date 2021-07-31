import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DialogMessageComponent } from '@tool-components/dialog-message/dialog-message.component';
import { DialogSpinnerComponent } from '@tool-components/dialog-spinner/dialog-spinner.component';
import { LoginClienteService } from '@global-services/login-cliente.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  forgotForm: FormGroup;

  // Getters para validaciones
  // Aquí obtenemos el estado de validez de cada campo del formulario en métodos separados
  get emailNoValido(): boolean | undefined {
    return this.forgotForm.get('email')?.invalid && this.forgotForm.get('email')?.touched;
  }

  constructor( private router: Router, private formBuilder: FormBuilder,
               private dialog: MatDialog, private authService: LoginClienteService,
               private snackBar: MatSnackBar ) {
    // Creación del formulario
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  // Método para obtener mensajes de errores de validaciones Email
  getErrorEmailMessage(): string {
    if (this.forgotForm.get('email')?.hasError('required')) {
      return 'Debe ingresar un valor';
    }

    return this.forgotForm.get('email')?.hasError('email') ? 'Email no válido' : '';
  }

  // Método para hacer el submit del formulario
  enviar(): void {
    this.dialog.open( DialogSpinnerComponent );
    const email = this.forgotForm.get('email')?.value;
    localStorage.setItem('email', email);
    this.authService.submitForgot( email ).subscribe((response: any) => {
      this.dialog.closeAll();
      // Abrimos el nuevo dialogo con el mensaje
      const mensaje = 'Hemos enviado un correo a ' + this.forgotForm.get('email')?.value + ' para que pueda realizar el proceso de recuperación de contraseña.';
      this.dialog.open( DialogMessageComponent,
                      { data: {
                          title: 'Recuperar Contraseña',
                          message: mensaje,
                          redirect: '/autentication/login'
                        } } );
    },
    (error: any) => {
      this.dialog.closeAll();
      this.snackBar.open('El correo es inválido', 'Cerrar', {
        duration: 5000
      });
    });
    console.log( this.forgotForm );
  }

  // Método para retornar a login
  return(): void{
    this.router.navigate(['/autentication/login']);
  }

}
