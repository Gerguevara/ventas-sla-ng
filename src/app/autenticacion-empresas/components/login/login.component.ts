import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AutenticacionService, LoginResponse } from '../../../autenticacion/services/autenticacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSpinnerComponent } from 'src/app/tools/components/dialog-spinner/dialog-spinner.component';
import { LoginEmpresasService } from '../../../core/services/login-empresas.service';
import { Empresa } from '../../../core/Models/empresa.model';
import { Auth } from 'src/app/core/Models/auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;

  // Respuesta del servidor
  

  // Getters para validaciones
  // Aquí obtenemos el estado de validez de cada campo del formulario en métodos separados
  get usuarioNoValido(): boolean | undefined {
    return this.loginForm.get('usuario')?.invalid && this.loginForm.get('usuario')?.touched;
  }
  get passwordNoValido(): boolean | undefined {
    return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched;
  }

  constructor( private router: Router,
               private formBuilder: FormBuilder,
               private authService: AutenticacionService,
               private authEmpresaService: LoginEmpresasService,
               private snackBar: MatSnackBar,
               private dialog: MatDialog ) {
    // Creación del formulario
    this.loginForm = this.formBuilder.group({
      usuario   : ['', [Validators.required]],
      password  : ['', [Validators.required]]
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
        this.router.navigate(['producto/index/table-producto']);
      },
      (error: any) => {
        // Cerramos todos los dialogos abiertos hasta el momento
        this.dialog.closeAll();
        // El inicio de sesión falla y mostramos un mensaje de error al usuario
        this.snackBar.open('Credenciales no válidas', 'Cerrar');
      });

    const credenciales: Auth = {
      id: 0,
      usuario: this.loginForm.get('usuario')?.value,
      password: this.loginForm.get('password')?.value
    };
    this.authEmpresaService.postObject( credenciales ).subscribe(
      // next:(response: any) => {console.log(response)}
    );
  }

  // Método para obtener mensajes de errores de validaciones Usuario
  getErrorUsuarioMessage(): string {
    if (this.loginForm.get('usuario')?.hasError('required')) {
      return 'Debe ingresar un valor';
    } else {
      return '';
    }
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

  // Navegación hacia Registro de empresa
  signup(): void {
    this.router.navigate(['/enterprise/signup']);
  }

  loginCliente(): void {
    this.router.navigate(['/autentication/login']);
  }

}
