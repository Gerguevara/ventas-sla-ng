import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginClienteService, LoginResponse } from '../../../core/services/login-cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSpinnerComponent } from 'src/app/tools/components/dialog-spinner/dialog-spinner.component';

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

  constructor( private router: Router,
               private formBuilder: FormBuilder,
               private authService: LoginClienteService,
               private snackBar: MatSnackBar,
               private dialog: MatDialog ) {
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
    // Abrimos el dialog del spinner
    this.dialog.open( DialogSpinnerComponent );
    // Hacemos un post a Login con las credenciales del formulario
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.submitLogin( email, password ).subscribe(
      (response: LoginResponse) => {
        // El inicio de sesión es exitoso y guardamos el token en el LocalStorage
        // Cerramos todos los dialogos abiertos hasta el momento
        this.dialog.closeAll();
        localStorage.setItem('token', response.token);
        localStorage.setItem('rol', response.user.tipoUsuario);
        this.router.navigate(['producto/index/table-producto']);
      },
      (error: any) => {
        // Cerramos todos los dialogos abiertos hasta el momento
        this.dialog.closeAll();
        // El inicio de sesión falla y mostramos un mensaje de error al usuario
        this.snackBar.open('Credenciales no válidas', 'Cerrar');
      });
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
    if (this.loginForm.get('password')?.hasError('minlength')) {
      return 'Debe tener más de 8 caracteres';
    }
    if (this.loginForm.get('password')?.hasError('pattern')) {
      return 'Contraseña no válida';
    }
    else {
      return '';
    }
  }

  // Navegación hacia Registro de usuario
  signup(): void {
    this.router.navigate(['/autentication/signup']);
  }

  loginEmpresarial(): void {
    this.router.navigate(['/enterprise']);
  }

}
