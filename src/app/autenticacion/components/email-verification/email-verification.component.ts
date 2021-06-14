import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutenticacionService, EmailVerificationResponse } from '../../services/autenticacion.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogSpinnerComponent } from 'src/app/tools/components/dialog-spinner/dialog-spinner.component';
import { DialogMessageComponent } from 'src/app/tools/components/dialog-message/dialog-message.component';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  spinner = true;

  constructor( public dialog: MatDialog,
               private activeRouter: ActivatedRoute,
               private auth: AutenticacionService ) { }

  ngOnInit(): void {
    // Abrimos el dialog del spinner
    this.dialog.open( DialogSpinnerComponent );
    // Tomamos los parámetros enviados por la ruta
    this.activeRouter.params.subscribe( params => {
      // Llamamos al servicio y le enviamos los parametros que recibimos
      this.auth.emailVerification( params.id, params.hash ).subscribe( (response: EmailVerificationResponse) => {
        // Se imprimen los mensajes si todo ha salido bien
        this.openDialog( response.mensaje );
      },
      ( error: any ) => {
        // En esta sección se imprimen los errores
        console.log( error );
        this.openDialog( error );
      });
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
          redirect: 'producto/index/table-producto'
        } } );
  }
}
