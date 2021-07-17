import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Departamento } from 'src/app/core/Models/departamento.model';
import { Resultado } from 'src/app/core/Models/resultado.model';

@Component({
  selector: 'app-departamento-table',
  templateUrl: './departamento-table.component.html',
  styleUrls: ['./departamento-table.component.scss']
})
export class DepartamentoTableComponent implements OnChanges {
  @ViewChild('departamentoTable') table!: MatTable<Departamento>;
  @Input()
  departamentos!: Departamento[];
  displayedColumns: string[] = ['id','nombre', 'descripcion', 'acciones'];

  constructor() { }

  ngOnChanges(cambios : SimpleChanges): void {
    console.log(cambios);
    const departamentosAux = cambios.departamentos; //const { categorias } = cambios;
    if(departamentosAux)
      this.table.dataSource = departamentosAux.currentValue;
  }

}
