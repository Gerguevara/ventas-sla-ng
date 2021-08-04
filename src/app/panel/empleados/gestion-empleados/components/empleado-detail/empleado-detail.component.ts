import { PerfilEmpleado } from '@models/perfil.empleado.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-empleado-detail',
  templateUrl: './empleado-detail.component.html',
  styleUrls: ['./empleado-detail.component.scss']
})
export class EmpleadoDetailComponent implements OnInit {
  profileLabel = 'Perfil del empleado';
  generalLabel = 'Detalles generales del empleado';
  documentsLabel = 'Documentos del empleado';
  corporateLabel = 'Informacion corporativa del empleado';
  constructor(@Inject(MAT_DIALOG_DATA) public empleado: PerfilEmpleado) {
  }

  ngOnInit(): void {
    console.log(this.empleado);
  }

}
