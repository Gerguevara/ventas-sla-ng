import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LineaPlanilla } from '@core/Models/linea.planilla.model';
import { Planilla } from '@core/Models/planilla.model';
import { PlanillaService } from '../../../../../core/services/planilla.service';
import { PlanillasFormComponent } from '../planillas-form/planillas-form.component';

@Component({
  selector: 'app-linea-planillas-table',
  templateUrl: './linea-planillas-table.component.html',
  styleUrls: ['./linea-planillas-table.component.scss']
})
export class LineaPlanillasTableComponent implements OnInit {

  displayedColumns: string[] = ['id_empleado', 'total_horas_extras', 'total_ingresos', 'total_descuentos', 'a_recibir'];
  dataSource!: MatTableDataSource<LineaPlanilla>;
  clickedRows = new Set<LineaPlanilla>();
  lineasDePlanilla: LineaPlanilla[] = [];

  constructor( public dialogRef: MatDialogRef<LineaPlanillasTableComponent>,
               @Inject(MAT_DIALOG_DATA) public planilla: Planilla,
               private dialog: MatDialog,
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
    this.lineasDePlanilla = lineasPlanilla;
    // Seteamos estos datos a la tabla
    this.dataSource = new MatTableDataSource<LineaPlanilla>(lineasPlanilla);
  }

  verLineaPlanilla( lineaPlanilla: LineaPlanilla ): void {
    const dialogFormRef = this.dialog.open( PlanillasFormComponent, { data: lineaPlanilla, width: '50vw' } );
    dialogFormRef.afterClosed().subscribe(( lineaPlanillaUpdate?: LineaPlanilla ) => {
      if ( lineaPlanillaUpdate ) {
        for ( let i = 0; i < this.lineasDePlanilla.length; i++ ) {
          if ( this.lineasDePlanilla[i].id === lineaPlanillaUpdate.id ) {
            this.lineasDePlanilla[i] = lineaPlanillaUpdate;
          }
        }
        this.dataSource = new MatTableDataSource<LineaPlanilla>(this.lineasDePlanilla);
      }
    });
  }

}
