import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Departamento } from 'src/app/core/models/departamento.model';

@Component({
  selector: 'app-departamento-table',
  templateUrl: './departamento-table.component.html',
  styleUrls: ['./departamento-table.component.scss']
})
export class DepartamentoTableComponent implements OnChanges {
  @Input()
  departamentos!: Departamento[];
  @Output()
  eventSelect = new EventEmitter<Departamento>();
  dataSource : MatTableDataSource<Departamento> = new MatTableDataSource(this.departamentos);
  displayedColumns: string[] = ['id','nombre', 'descripcion', 'acciones'];

  constructor() { }

  ngOnChanges(cambios : SimpleChanges): void {
    console.log(cambios);
    const cambiosDepartamentos = cambios.departamentos; //const { categorias } = cambios;
    if(cambiosDepartamentos)
      this.dataSource = cambiosDepartamentos.currentValue;
  }
}
