import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { environment } from '@environments/environment';
import { Resultado } from '@models/resultados/resultado.model';
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

  constructor(
    private roles: RolesService,
    private formDialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  // Obtenemos todos los cambios que nos envíe el paginador con la data de la página
  addDataToTable( event: Rol[] ): void {
    if(event){
      this.dataSource = new MatTableDataSource(event);
    } else {
      // Seteamos estos datos a la tabla
      this.roles.getObjects().subscribe(
        {
          next: (rol: Resultado<Rol>)=>{
            console.log(rol);
            this.dataSource = new MatTableDataSource(rol.data);
          }
        }
      )
    }
  }

  verRol( rol: Rol ): void {
    const verRolDialog = this.formDialog.open(
      RolFormComponent, { data: rol }
    );
    verRolDialog.afterClosed().subscribe(
      {
        next: ( rolUpdate?: Rol) => {
          if ( rolUpdate ) {
            this.dataSource.data.splice( (rolUpdate.id % this.dataSource.data.length) - 1, 1 );
            this.dataSource.data.push( rolUpdate );
            this.dataSource.data = this.dataSource.data;
          }
        }
      }
    );
  }

  crearRol(): void{
    const crearRolDialog = this.formDialog.open( RolFormComponent );
    crearRolDialog.afterClosed().subscribe(
      {
        next: (rolCreate: Rol) => {
        if ( rolCreate ) {
          this.dataSource.data.push( rolCreate );
          this.dataSource.data = this.dataSource.data;
        }
      }
    });
  }

  eliminarRol( id: number ): void {
    this.formDialog.open( DialogSpinnerComponent );
    this.roles.deleteRol( id ).subscribe(
      {
        next: (response: any) => {
          console.log(response);
          this.formDialog.closeAll();
          this.dataSource.data.splice( id - 1, 1 );
          this.dataSource.data = this.dataSource.data;
          this.snackBar.open('El rol se ha eliminado exitosamente', 'Cerrar', {
            duration: 5000
          });
        },
        error: (error: any) => {
          this.formDialog.closeAll();
          console.log(error);
          this.snackBar.open('Ah ocurrido un error!', 'Cerrar', {
            duration: 5000
          });
        }
      }
    );
  }

  getDepartamento( id: number ): string {
    let departamento = '';
    this.roles.getDepartamento( id ).subscribe(
      {
        next: (response: any) => {
        departamento = response.producto.nombre;
        }
      });
    return departamento;
  }

}
