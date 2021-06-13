import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface DialogData {
  title: string;
  message: string;
  redirect: string;
}

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.scss']
})
export class DialogMessageComponent implements OnInit {

  /* Este es un componente de mensaje de dialogo destinado para ser reutilizable
     en cualquier componente hijo del AppModule y cuyos titulo y mensaje son parametrizables */
  constructor( public dialogRef: MatDialogRef<DialogMessageComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData,
               private router: Router ) {
                  // Evitamos que el dialogo del spinner pueda ser cerrado al hacer click fuera de el
                  this.dialogRef.disableClose = true;
               }

  ngOnInit(): void {
  }

  /* Aquí se recoge de la data la URL a la cual se quiere redireccionar al cerrar
     el cuadro de dialogo */
  redirect( url: string ): void {
    this.router.navigate([ url ]);
  }

}
