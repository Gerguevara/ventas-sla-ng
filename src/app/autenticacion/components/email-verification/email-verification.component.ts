import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogSpinnerComponent } from '@tool-components/dialog-spinner/dialog-spinner.component';
import { DialogMessageComponent } from '@tool-components/dialog-message/dialog-message.component';
import { EmailVerificationResponse } from '@tool-models/EmailVerificationResponse';
import { UsuarioService } from '@global-services/usuario.service';
import { LoginClienteService } from '@global-services/login-cliente.service';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-email-verification',
  template: '',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  spinner = true;

  constructor(
    public dialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private activeRouter: ActivatedRoute,
    private loginClienteService: LoginClienteService,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    // Abrimos el dialog del spinner
    this.dialog.open( DialogSpinnerComponent );
    // Tomamos los parámetros enviados por la ruta
    this.activeRouter.params.subscribe(
      {
        next: (params: Params) => {
          if (params.type === 'register'){
            // Llamamos al servicio y le enviamos los parametros que recibimos
            this.loginClienteService.emailVerification( params.id, params.hash ).subscribe(
              {
                next: (response: EmailVerificationResponse) => {
                  // Se imprimen los mensajes si todo ha salido bien
                  const tokenRegistro = localStorage.getItem('token-registro');
                  if (tokenRegistro) {
                    localStorage.setItem('token', tokenRegistro);
                    localStorage.removeItem('token-registro');
                  }
                  this.openDialog( response.mensaje );
                },
                error: ( error: any ) => {
                  // En esta sección se imprimen los errores
                  console.error( error );
                  this.openDialog( error );
                }
              }
            );
          } else if(params.type === 'change'){
            this.usuarioService.confirmEmailChange(params.id, params.hash).subscribe({
              next:(result: string)=>{
                this.openDialog( result );
              }
            });
          }
        }
    });
  }

  openDialog( mensaje: string ): void {
    // Cerramos todos los dialogos abiertos hasta el momento
    this.dialog.closeAll();
    // Abrimos el nuevo dialogo con el mensaje
    this.dialog.open( DialogMessageComponent,
      { data: {
          title: 'Verificación de Email',
          message: mensaje,
          redirect: ''
        } } );
  }
}
