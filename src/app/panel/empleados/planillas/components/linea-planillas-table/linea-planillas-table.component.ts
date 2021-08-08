import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LineaPlanilla } from '@core/Models/linea.planilla.model';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-linea-planillas-table',
  templateUrl: './linea-planillas-table.component.html',
  styleUrls: ['./linea-planillas-table.component.scss']
})
export class LineaPlanillasTableComponent implements OnInit {

  private endpoint = 'planillas';
  displayedColumns: string[] = ['id', 'name', 'fecha', 'acciones'];
  dataSource!: MatTableDataSource<LineaPlanilla>;
  clickedRows = new Set<LineaPlanilla>();

  url = `${environment.apiUrl}${this.endpoint}`;
  params = '';

  constructor() { }

  ngOnInit(): void {
  }

  // Obtenemos todos los cambios que nos envíe el paginador con la data de la página
  addDataToTable( event: LineaPlanilla[] ): void {
    // Seteamos estos datos a la tabla
    this.dataSource = new MatTableDataSource<LineaPlanilla>(event);
  }

}
