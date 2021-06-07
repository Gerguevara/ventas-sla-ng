import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor( private router: Router, private formBuilder: FormBuilder ) {
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
    console.log( this.forgotForm );
  }

  // Método para retornar a login
  return(): void{
    this.router.navigate(['/autentication/login']);
  }

}
