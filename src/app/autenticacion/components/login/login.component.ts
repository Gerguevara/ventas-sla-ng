import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;

  // Getters para validaciones
  // Aquí obtenemos el estado de validez de cada campo del formulario en métodos separados
  get emailNoValido(): boolean | undefined {
    return this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched;
  }
  get passwordNoValido(): boolean | undefined {
    return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched;
  }

  constructor( private router: Router, private formBuilder: FormBuilder ) {
    // Creación del formulario
    this.loginForm = this.formBuilder.group({
      email   : ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  // Método para hacer submit del formulario
  enviar(): void{
    console.log( this.loginForm );
  }

  // Método para obtener mensajes de errores de validaciones Email
  getErrorEmailMessage(): string {
    if (this.loginForm.get('email')?.hasError('required')) {
      return 'Debe ingresar un valor';
    }

    return this.loginForm.get('email')?.hasError('email') ? 'Email no válido' : '';
  }

  // Método para obtener mensajes de errores de validaciones Password
  getErrorPassMessage(): string {
    if (this.loginForm.get('password')?.hasError('required')) {
      return 'Debe ingresar un valor';
    }

    return this.loginForm.get('password')?.hasError('password') ? 'Contraseña no válida' : '';
  }

  // Navegación hacia Registro de usuario
  signup(): void {
    this.router.navigate(['/autentication/signup']);
  }

}
