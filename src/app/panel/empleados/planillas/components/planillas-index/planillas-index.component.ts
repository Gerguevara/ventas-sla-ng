import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '@environments/environment';
import { Planilla } from 'src/app/core/models/planilla.model';
import { LineaPlanillasTableComponent } from '../linea-planillas-table/linea-planillas-table.component';
import { DialogSpinnerComponent } from '@tool-components/dialog-spinner/dialog-spinner.component';
import { PlanillaService } from '@global-services/planilla.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor( private dialog: MatDialog,
               private planillaService: PlanillaService,
               private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
  }

  // Obtenemos todos los cambios que nos envíe el paginador con la data de la página
  addDataToTable( event: Planilla[] ): void {
    // Seteamos estos datos a la tabla
    this.dataSource = new MatTableDataSource<Planilla>(event);
  }

  verPlanilla( planilla: Planilla ): void {
    this.dialog.open( LineaPlanillasTableComponent, { data: planilla, width: '60vw' } );
  }

  eliminarPlanilla( planilla: Planilla ): void {
    this.dialog.open( DialogSpinnerComponent );
    this.planillaService.eliminarPlanilla( planilla.id ).subscribe((response: any) => {
      this.snackBar.open( 'La planilla ha sido eliminada', 'Cerrar', { duration: 5000 } );
      this.dialog.closeAll();
    },
    (error: any) => {
      console.log(error);
    });
  }

}
