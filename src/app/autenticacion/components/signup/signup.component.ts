import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from '../../services/validators.service';

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
  get nombreNoValido(): boolean | undefined {
    return this.signupForm.get('nombre')?.invalid && this.signupForm.get('nombre')?.touched;
  }
  get apellidoNoValido(): boolean | undefined {
    return this.signupForm.get('apellido')?.invalid && this.signupForm.get('apellido')?.touched;
  }
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

  constructor( private router: Router, private formBuilder: FormBuilder, private validadores: ValidatorsService ) {
    // Creación del formulario
    this.signupForm = this.formBuilder.group({
      nombre   : ['', [ Validators.required, Validators.minLength(5) ]],
      apellido : ['', [ Validators.required, Validators.minLength(5) ]],
      email    : ['', [ Validators.required, Validators.email ]],
      password : ['', [ Validators.required, Validators.minLength(10) ]],
      password2: ['', [ Validators.required, Validators.minLength(10) ]]
    }, {
      validators: this.validadores.contraseñasIguales( 'password', 'password2' )
    });
  }

  ngOnInit(): void {
  }

  // Método para hacer submit del formulario
  enviar(): void{
    console.log( this.signupForm );
  }

  // Método para obtener mensajes de errores de validaciones Nombre
  getErrorNombreMessage(): string {
    if (this.signupForm.get('nombre')?.hasError('required')) {
      return 'Debe ingresar un valor';
    }

    return this.signupForm.get('nombre')?.hasError('minlength') ? 'Nombre no válido' : '';
  }

  // Método para obtener mensajes de errores de validaciones Apellido
  getErrorApellidoMessage(): string {
    if (this.signupForm.get('apellido')?.hasError('required')) {
      return 'Debe ingresar un valor';
    }

    return this.signupForm.get('apellido')?.hasError('minlength') ? 'Apellido no válido' : '';
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

    return this.signupForm.get('password')?.hasError('minlength') ? 'Contraseña no válida' : '';
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

  // Método para retornar a login
  return(): void {
    this.router.navigate(['/autentication/login']);
  }

}
