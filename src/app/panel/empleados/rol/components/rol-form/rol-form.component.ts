import { DepartamentoService } from './../../../../../core/services/departamento.service';
import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Rol } from '@models/rol.model';
import { Departamento } from '@models/departamento.model';
import { Permission } from '@models/permission.model';

import { PermissionService } from '@global-services/permission.service';
import { RolesService } from '@global-services/roles.service';
import { Resultado } from '@models/resultados/resultado.model';

import { PermissionsByPanel } from '@tool-models/PermissionsByPanel'
import { DialogSpinnerComponent } from '@tool-components/dialog-spinner/dialog-spinner.component';
import { environment } from '@environments/environment';

export interface User {
  name: string;
}

@Component({
  selector: 'app-rol-form',
  templateUrl: './rol-form.component.html',
  styleUrls: ['./rol-form.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class RolFormComponent implements OnInit {

  // Getters para validaciones
  // Aquí obtenemos el estado de validez de cada campo del formulario en métodos separados
  get nombreNoValido(): boolean | undefined {
    return this.nombreControl.invalid && this.nombreControl.touched;
  }
  get descripcionNoValido(): boolean | undefined {
    return this.descripcionControl.invalid && this.descripcionControl.touched;
  }
  get departamentoNoValido(): boolean | undefined {
    return this.departamentoControl?.invalid && this.departamentoControl?.touched;
  }

  // Tabla de categorias
  url = `${environment.apiUrl}departamentos/`;
  displayedColumns: string[] = ['id', 'nombre', 'descripcion'];
  dataSource!: MatTableDataSource<any>;
  filasSeleccionadas = new Set<any>();
  selectable = true;
  removable = true;
  departamento = '';

  // Autocomplete
  options: Departamento[] = [];
  filteredDepartamentos: Observable<Departamento[]> = of<Departamento[]>([]);
  searching = false;

  // Variables del formulario
  rolForm: FormGroup;
  disableToggles = true;
  enableEdit = false;
  // Arreglo boolean que determina el valor de cada switch de permisos
  permisos: number[] = [];
  permisosPorPanel: PermissionsByPanel[] = [];
  newRol!: Rol;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RolFormComponent>,
    @Inject(MAT_DIALOG_DATA) public rol: Rol,
    private roleService: RolesService,
    private departamentoService: DepartamentoService,
    private permission: PermissionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    // Inicializacion del formulario
    this.rolForm = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      departamento: ['', Validators.required],
      permissions: [[]]
    });
    if (this.rol) {
      this.roleService.getPermisos( this.rol.id ).subscribe((response: Permission[]) => {
        for (const item of response) {
         this.permisos.push(item.id);
        }
      });
    }
    this.roleService.getPanels().subscribe(( response: PermissionsByPanel[] ) => {
      this.permisosPorPanel = response;
    });
  }

  ngOnInit(): void {
    this.rolForm.disable();
    // Si se trae un rol se carga la data solo para previsualizacion
    if (this.rol) {
      this.cargarData(this.rol);
    } else {
      // Sino se abre el formulario para crear un nuevo rol
      this.editar();
    }
    this.loadDepartamento();
    this.permissionsControl?.setValue(this.permisos);
  }

  displayFn(dep: Departamento): string {
    return dep && dep.nombre ? dep.nombre : '';
  }

  private _filter(name: string): Observable<Departamento[]> {
    return this.roleService.searchDepartamento(name);
  }

  loadDepartamento(value?: string){
    this.filteredDepartamentos = value ? this._filter(value):  this.departamentoService.getObjects().pipe(
      map((response: Resultado<Departamento>) => {
        return response.data;
      })
    )
  }

  filterHandler(){
    const departamento = (this.departamentoControl as FormControl).value;
    this.loadDepartamento(departamento);
  }

  // Obtenemos todos los cambios que nos envíe el paginador con la data de la página
  addDataToTable( event: any[] ): void {
    if(event){
      this.dataSource = new MatTableDataSource(event);
    } else {
      // Seteamos estos datos a la tabla
      this.roleService.getObjects().subscribe(
        {
          next: (rol: Resultado<Rol>)=>{
            console.log(rol);
            this.dataSource = new MatTableDataSource(rol.data);
          }
        }
      )
    }
  }

  cargarData( rol: Rol ): void {
    // Método para cargar toda la data que venga de afuera en el formulario
    this.rolForm.get('id')?.setValue( rol.id );
    this.nombreControl.setValue( rol.name );
    this.descripcionControl.setValue( rol.descripcion );
    this.roleService.getDepartamento( Number(rol.id_departamento) ).subscribe(
      {
        next: (response: any) => {
        this.departamentoControl?.setValue( response.producto );
        }
      }
    );
  }

  habilitarPermiso( id: number ): void{
    // Verificamos si el permiso existe en el array
    const index = this.permisos.indexOf(id);
    if (index > -1) {
      // Si es así, se elimina
      this.permisos.splice(index, 1);
      this.permissionsControl?.setValue(this.permisos);
    } else {
      // de lo contrario se añade a la lista
      this.permisos.push(id);
      this.permissionsControl?.setValue(this.permisos);
    }
  }

  quitarDepartamento(): void {
    if (this.enableEdit) {
      this.filasSeleccionadas.clear();
      this.departamento = '';
      this.departamentoControl?.setValue( '' );
    }
  }

  seleccionarDepartamento( dep: any ): void {
    if (this.enableEdit) {
      this.filasSeleccionadas.clear();
      this.filasSeleccionadas.add( dep );
      this.departamento = dep.nombre;
      this.departamentoControl?.setValue( dep.id );
    }
  }

  editar(): void {
    // Se habilitan los controles del formulario para la edición
    this.rolForm.enable();
    this.enableEdit = true;
    this.disableToggles = false;
  }

  enviar(): void {
    const dialogSpinnerRef = this.dialog.open( DialogSpinnerComponent );
    // Se verifica si el rol proviene de afuera
    if ( this.rol ) {
      // si es así, se actualiza
      const newRol = {
        name: this.nombreControl.value,
        descripcion: this.descripcionControl.value,
        id_departamento: this.rol.id_departamento,
        permissions: this.permissionsControl?.value
      };
      this.roleService.actualizarRol( newRol as Rol, this.rolForm.get('id')?.value ).subscribe((response: any) => {
        dialogSpinnerRef.close();
        this.snackBar.open(response.mensaje, 'Cerrar', {
          duration: 5000
        });
        this.dialogRef.close( response.role );
      }, (error: any) => {
        dialogSpinnerRef.close();
        console.log(error);
        this.snackBar.open('Ah ocurrido un error!', 'Cerrar', {
          duration: 5000
        });
      });
    } else {
      // De lo contrario, se crea un nuevo rol
      const departamentoSeleccionado = this.departamentoControl?.value;
      const newRol = {
        name: this.nombreControl.value,
        descripcion: this.descripcionControl.value,
        id_departamento: departamentoSeleccionado.id,
        permissions: this.permissionsControl?.value
      };
      this.roleService.crearRol( newRol as Rol ).subscribe((response: any) => {
        dialogSpinnerRef.close();
        this.snackBar.open(response.mensaje, 'Cerrar', {
          duration: 5000
        });
        this.dialogRef.close( response.role );
      }, (error: any) => {
        dialogSpinnerRef.close();
        console.log(error);
        this.snackBar.open('Ah ocurrido un error!', 'Cerrar', {
          duration: 5000
        });
        this.dialogRef.close();
      });
    }
  }

  cerrarDialogo(): void {
    this.dialogRef.close();
  }

  // Método para obtener mensajes de errores de validaciones Nombre
  getErrorNombreMessage(): string {
    if (this.nombreControl.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    else if (this.nombreControl.hasError('minlength')) {
      return 'Nombre no válido';
    }
    else {
      return '';
    }
  }

  // Método para obtener mensajes de errores de validaciones Nombre
  getErrorDepartamentoMessage(): string {
    if (this.departamentoControl?.hasError('required')) {
      return 'Debe seleccionar un departamento';
    }
    else {
      return '';
    }
  }

  // Método para obtener mensajes de errores de validaciones Descripción
  getErrorDescripcionMessage(): string {
    if (this.descripcionControl.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    else if (this.descripcionControl.hasError('minlength')) {
      return 'Descripción no válida';
    }
    else {
      return '';
    }
  }

  get nombreControl(): FormControl{
    return this.rolForm.get('nombre') as FormControl;
  }
  get descripcionControl(): FormControl{
    return this.rolForm.get('descripcion') as FormControl;
  }
  get departamentoControl(): FormControl{
    return this.rolForm.get('departamento') as FormControl;
  }
  get permissionsControl(): FormControl{
    return this.rolForm.get('permissions') as FormControl;
  }

}
