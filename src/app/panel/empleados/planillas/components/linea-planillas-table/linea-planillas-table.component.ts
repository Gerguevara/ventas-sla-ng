import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LineaPlanilla } from '@core/Models/linea.planilla.model';
import { Planilla } from '@core/Models/planilla.model';
import { PlanillaService } from '../../../../../core/services/planilla.service';

@Component({
  selector: 'app-linea-planillas-table',
  templateUrl: './linea-planillas-table.component.html',
  styleUrls: ['./linea-planillas-table.component.scss']
})
export class LineaPlanillasTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'id_empleado', 'total_horas_extras', 'total_ingresos', 'total_descuentos', 'a_recibir'];
  dataSource!: MatTableDataSource<LineaPlanilla>;
  clickedRows = new Set<LineaPlanilla>();

  constructor( public dialogRef: MatDialogRef<LineaPlanillasTableComponent>,
               @Inject(MAT_DIALOG_DATA) public planilla: Planilla,
               private planillaService: PlanillaService ) { }

  ngOnInit(): void {
    if ( this.planilla ) {
      this.planillaService.mostrarPlanilla( this.planilla ).subscribe((response: LineaPlanilla[]) => {
        this.addDataToTable( response );
      });
    }
  }

  // Obtenemos todos los cambios que nos envíe el paginador con la data de la página
  addDataToTable( lineasPlanilla: LineaPlanilla[] ): void {
    // Seteamos estos datos a la tabla
    this.dataSource = new MatTableDataSource<LineaPlanilla>(lineasPlanilla);
  }

}
