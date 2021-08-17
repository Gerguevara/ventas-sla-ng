import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '@environments/environment';

@Component({
  selector: 'sla-ventas-index',
  templateUrl: './ventas-index.component.html',
  styleUrls: ['./ventas-index.component.scss']
})
export class VentasIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'departamento', 'acciones'];
  dataSource!: MatTableDataSource<any>;
  clickedRows = new Set<any>();

  private endpoint = '';
  url = `${environment.apiUrl}${this.endpoint}`;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * @ngdoc method
   * @name VentasIndexComponent:addDataToTable
   * @description
   * Recibe la información paginada proveniente del componente de paginación dentro del
   * módulo Tools, a través de un evento que notifica la recepción de la información,
   * y la coloca dentro del DataSource de la tabla para que esta se muestre.
   * @param event
   * @return void
   */
  addDataToTable( event: any[] ): void {
    this.dataSource = new MatTableDataSource<any>(event);
  }

}
