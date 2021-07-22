import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Rol } from 'src/app/core/Models/rol.model';
import { environment } from 'src/environments/environment';
import { RolesService } from '../../../../../core/services/roles.service';
import { RolFormComponent } from '../rol-form/rol-form.component';

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
               private formDialog: MatDialog, ) { }

  ngOnInit(): void { }

  // Obtenemos todos los cambios que nos envíe el paginador con la data de la página
  addDataToTable( event: Rol[] ): void {
    // Seteamos estos datos a la tabla
    console.log(event);
    this.dataSource = new MatTableDataSource<Rol>(event);
  }

  verRol( rol: Rol ): void {
    const dialogoFormRef = this.formDialog.open(
      RolFormComponent, { data: rol }
    );
  }

  eliminarRol( id: number ): void {
    console.log(id);
  }

  getDepartamento( id: number ): string {
    let departamento = '';
    this.roles.getDepartamento( id ).then((response: any) => {
      departamento = response.producto.nombre;
    });
    return departamento;
  }

}
