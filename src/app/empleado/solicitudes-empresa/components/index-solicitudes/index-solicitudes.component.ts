import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitudesEmpresaService } from '../../../../core/services/solicitudes-empresa.service';
import { Empresa } from '../../../../core/Models/empresa.model';
import { MatDialog } from '@angular/material/dialog';
import { MostraSolicitudComponent } from '../mostra-solicitud/mostra-solicitud.component';

@Component({
  selector: 'app-index-solicitudes',
  templateUrl: './index-solicitudes.component.html',
  styleUrls: ['./index-solicitudes.component.scss']
})
export class IndexSolicitudesComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'NombreComercial', 'FechaSolicitud', 'Acciones'];
  dataSource!: MatTableDataSource<Empresa>;

  constructor( private solicitudesEmpresaService: SolicitudesEmpresaService,
               private dialog: MatDialog ) {
    this.solicitudesEmpresaService.getData().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource<Empresa>(response.usuarioEmpresa);
    });
  }

  ngOnInit(): void {
  }

  mostrarDialogo( solicitud: Empresa ): void {
    // Cerramos todos los dialogos abiertos hasta el momento
    this.dialog.closeAll();
    // Abrimos el nuevo dialogo con el mensaje
    this.dialog.open( MostraSolicitudComponent, { data: solicitud } );
  }

}