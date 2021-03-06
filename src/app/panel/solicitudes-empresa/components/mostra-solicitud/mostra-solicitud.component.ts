import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Empresa } from '@models/empresa.model';
import { SolicitudesEmpresaService } from '@global-services/solicitudes-empresa.service';
import { DialogSpinnerComponent } from '@tool-components/dialog-spinner/dialog-spinner.component';


@Component({
  selector: 'app-mostra-solicitud',
  templateUrl: './mostra-solicitud.component.html',
  styleUrls: ['./mostra-solicitud.component.scss']
})
export class MostraSolicitudComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<MostraSolicitudComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Empresa,
               private solicitudesEmpresaService: SolicitudesEmpresaService,
               private snackBar: MatSnackBar,
               private dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  cambiarEstado( estado: string ): void {
    this.dialog.open( DialogSpinnerComponent );
    this.solicitudesEmpresaService.updateEstadoSolicitud( this.data.id, estado ).subscribe((response: any) => {
      this.snackBar.open(response.mensaje, 'Cerrar', { duration: 5000 });
      this.dialog.closeAll();
    },
    (error: any) => {
      this.snackBar.open('Ha ocurrido un error', 'Cerrar', { duration: 5000 });
      this.dialog.closeAll();
    });
  }

}
