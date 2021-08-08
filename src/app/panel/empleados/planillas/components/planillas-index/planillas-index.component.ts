import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '@environments/environment';
import { Planilla } from '../../../../../core/Models/planilla.model';
import { LineaPlanillasTableComponent } from '../linea-planillas-table/linea-planillas-table.component';

@Component({
  selector: 'app-planillas-index',
  templateUrl: './planillas-index.component.html',
  styleUrls: ['./planillas-index.component.scss']
})
export class PlanillasIndexComponent implements OnInit {

  private endpoint = 'planillas';
  displayedColumns: string[] = ['id', 'name', 'fecha', 'acciones'];
  dataSource!: MatTableDataSource<Planilla>;
  clickedRows = new Set<Planilla>();

  url = `${environment.apiUrl}${this.endpoint}`;
  params = '';

  constructor( private dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  // Obtenemos todos los cambios que nos envíe el paginador con la data de la página
  addDataToTable( event: Planilla[] ): void {
    // Seteamos estos datos a la tabla
    this.dataSource = new MatTableDataSource<Planilla>(event);
  }

  verPlanilla( planilla: Planilla ): void {
    this.dialog.open( LineaPlanillasTableComponent, { data: planilla } );
  }

}
