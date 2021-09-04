import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { environment } from '@environments/environment';
import { Rol } from '@models/rol.model';
import { RolesService } from '@global-services/roles.service';

import { RolFormComponent } from '../rol-form/rol-form.component';
import { DialogSpinnerComponent } from '@tools/components/dialog-spinner/dialog-spinner.component';

@Component({
  selector: 'app-rol-index',
  templateUrl: './rol-index.component.html',
  styleUrls: ['./rol-index.component.scss']
})
export class RolIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'departamento', 'acciones'];
  dataSource!: MatTableDataSource<Rol>;
  clickedRows = new Set<Rol>();

  private endpoint = 'roles';
  // URL donde se consumen los datos
  url = `${environment.apiUrl}${this.endpoint}`;

  constructor( private roles: RolesService,
               private formDialog: MatDialog,
               private snackBar: MatSnackBar ) { }

  ngOnInit(): void { }

  // Obtenemos todos los cambios que nos envíe el paginador con la data de la página
  addDataToTable( event: Rol[] ): void {
    // Seteamos estos datos a la tabla
    this.dataSource = new MatTableDataSource<Rol>(event);
  }

  verRol( rol: Rol ): void {
    const verRolDialog = this.formDialog.open(
      RolFormComponent, { data: rol }
    );
    verRolDialog.afterClosed().subscribe(( rolUpdate?: Rol) => {
      if ( rolUpdate ) {
        this.dataSource.data.splice( (rolUpdate.id % this.dataSource.data.length) - 1, 1 );
        this.dataSource.data.push( rolUpdate );
        this.dataSource.data = this.dataSource.data;
      }
    });
  }

  crearRol(): void{
    const crearRolDialog = this.formDialog.open( RolFormComponent );
    crearRolDialog.afterClosed().subscribe((rolCreate: Rol) => {
      if ( rolCreate ) {
        this.dataSource.data.push( rolCreate );
        this.dataSource.data = this.dataSource.data;
      }
    });
  }

  eliminarRol( id: number ): void {
    this.formDialog.open( DialogSpinnerComponent );
    this.roles.deleteRol( id ).subscribe((response: any) => {
      this.formDialog.closeAll();
      this.dataSource.data.splice( id - 1, 1 );
      this.dataSource.data = this.dataSource.data;
      this.snackBar.open('El rol se ha eliminado exitosamente', 'Cerrar', {
        duration: 5000
      });
    }, (error: any) => {
      this.formDialog.closeAll();
      console.log(error);
      this.snackBar.open('Ah ocurrido un error!', 'Cerrar', {
        duration: 5000
      });
    });
  }

  getDepartamento( id: number ): string {
    let departamento = '';
    this.roles.getDepartamento( id ).then((response: any) => {
      departamento = response.producto.nombre;
    });
    return departamento;
  }

}
