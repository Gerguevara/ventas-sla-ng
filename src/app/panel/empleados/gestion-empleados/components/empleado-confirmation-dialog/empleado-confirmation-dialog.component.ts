import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PerfilEmpleado } from '@models/perfil.empleado.model';

@Component({
  selector: 'app-empleado-confirmation-dialog',
  templateUrl: './empleado-confirmation-dialog.component.html',
  styleUrls: ['./empleado-confirmation-dialog.component.scss']
})
export class EmpleadoConfirmationDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public empleado : PerfilEmpleado) { }

}
