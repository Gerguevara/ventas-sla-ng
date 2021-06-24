import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empresa } from 'src/app/core/Models/empresa.model';
import { SolicitudesEmpresaService } from 'src/app/core/services/solicitudes-empresa.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mostra-solicitud',
  templateUrl: './mostra-solicitud.component.html',
  styleUrls: ['./mostra-solicitud.component.scss']
})
export class MostraSolicitudComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<MostraSolicitudComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Empresa,
               private solicitudesEmpresaService: SolicitudesEmpresaService,
               private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
  }

  cambiarEstado( estado: string ): void {
    this.solicitudesEmpresaService.updateEstadoSolicitud( this.data.id, estado ).subscribe((response: any) => {
      this.snackBar.open(response.mensaje, 'Cerrar', { duration: 5000 });
      this.dialogRef.close();
    },
    (error: any) => {
      this.snackBar.open('Ha ocurrido un error', 'Cerrar', { duration: 5000 });
    });
  }

}
