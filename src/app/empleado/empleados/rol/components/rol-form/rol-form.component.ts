import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from '../../../../../core/Models/rol.model';
import { RolesService } from 'src/app/core/services/roles.service';
import { Permission } from 'src/app/core/Models/permission.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSpinnerComponent } from 'src/app/tools/components/dialog-spinner/dialog-spinner.component';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';

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
    return this.rolForm.get('nombre')?.invalid && this.rolForm.get('nombre')?.touched;
  }
  get descripcionNoValido(): boolean | undefined {
    return this.rolForm.get('descripcion')?.invalid && this.rolForm.get('descripcion')?.touched;
  }
  get departamentoNoValido(): boolean | undefined {
    return this.rolForm.get('departamento')?.invalid && this.rolForm.get('departamento')?.touched;
  }

  // Tabla de categorias
  url = `${environment.apiUrl}` + 'departamentos/';
  displayedColumns: string[] = ['id', 'nombre', 'descripcion'];
  dataSource!: MatTableDataSource<any>;
  filasSeleccionadas = new Set<any>();
  selectable = true;
  removable = true;
  departamento = '';

  // Variables del formulario
  rolForm: FormGroup;
  disableToggles = true;
  enableEdit = false;
  // Arreglo boolean que determina el valor de cada switch de permisos
  toggles = [ false, false, false, false, false, false, false, false, false, false, false, false,
              false, false, false, false, false, false, false, false, false, false, false, false,
              false, false, false, false, false, false, false, false, false, false, false, false,
              false ];
  permisos: number[] = [];
  newRol!: Rol;

  constructor( private formBuilder: FormBuilder,
               public dialogRef: MatDialogRef<RolFormComponent>,
               @Inject(MAT_DIALOG_DATA) public rol: Rol,
               private roleService: RolesService,
               private snackBar: MatSnackBar,
               private dialog: MatDialog ) {
    // Inicializacion del formulario
    this.rolForm = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      departamento: ['', Validators.required],
      permissions: [[]]
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
  }

  // Obtenemos todos los cambios que nos envíe el paginador con la data de la página
  addDataToTable( event: any[] ): void {
    // Seteamos estos datos a la tabla
    this.dataSource = new MatTableDataSource<any>(event);
  }

  cargarData( rol: Rol ): void {
    // Método para cargar toda la data que venga de afuera en el formulario
    this.rolForm.get('id')?.setValue( rol.id );
    this.rolForm.get('nombre')?.setValue( rol.name );
    this.rolForm.get('descripcion')?.setValue( rol.descripcion );
    this.rolForm.get('departamento')?.setValue( rol.id_departamento );
    this.roleService.getDepartamento( Number(rol.id_departamento) ).then((response: any) => {
      this.filasSeleccionadas.add( response.producto );
      this.departamento = response.producto.nombre;
    });
    this.roleService.getPermisos( rol.id ).subscribe((response: Permission[]) => {
      // Se recogen los permisos del rol seleccionado y se atribuye a cada switch a través del array
      const data = [];
      for ( const item of response ) {
        this.toggles[ item.id - 1 ] = true;
        data.push(item.id);
      }
      this.rolForm.get('permissions')?.setValue(data);
      this.permisos = data;
    });
  }

  habilitarPermiso( id: number ): void{
    // Verificamos si el permiso existe en el array
    const index = this.permisos.indexOf(id);
    if (index > -1) {
      // Si es así, se elimina
      this.permisos.splice(index, 1);
      this.rolForm.get('permissions')?.setValue(this.permisos);
    } else {
      // de lo contrario se añade a la lista
      this.permisos.push(id);
      this.rolForm.get('permissions')?.setValue(this.permisos);
    }
  }

  quitarDepartamento(): void {
    if (this.enableEdit) {
      this.filasSeleccionadas.clear();
      this.departamento = '';
      this.rolForm.get('departamento')?.setValue( '' );
    }
  }

  seleccionarDepartamento( dep: any ): void {
    if (this.enableEdit) {
      this.filasSeleccionadas.clear();
      this.filasSeleccionadas.add( dep );
      this.departamento = dep.nombre;
      this.rolForm.get('departamento')?.setValue( dep.id );
    }
  }

  editar(): void {
    // Se habilitan los controles del formulario para la edición
    this.rolForm.enable();
    this.enableEdit = true;
    this.disableToggles = false;
  }

  enviar(): void {
    this.dialog.open( DialogSpinnerComponent );
    // Se verifica si el rol proviene de afuera
    if ( this.rol ) {
      // si es así, se actualiza
      const newRol = {
        name: this.rolForm.get('nombre')?.value,
        descripcion: this.rolForm.get('descripcion')?.value,
        id_departamento: this.rol.id_departamento,
        permissions: this.rolForm.get('permissions')?.value
      };
      this.roleService.actualizarRol( newRol as Rol, this.rolForm.get('id')?.value ).subscribe((response: any) => {
        this.dialog.closeAll();
        this.snackBar.open(response.mensaje, 'Cerrar', {
          duration: 5000
        });
      }, (error: any) => {
        this.dialog.closeAll();
        console.log(error);
        this.snackBar.open('Ah ocurrido un error!', 'Cerrar', {
          duration: 5000
        });
      });
    } else {
      // De lo contrario, se crea un nuevo rol
      const newRol = {
        name: this.rolForm.get('nombre')?.value,
        descripcion: this.rolForm.get('descripcion')?.value,
        id_departamento: this.rolForm.get('departamento')?.value,
        permissions: this.rolForm.get('permissions')?.value
      };
      this.roleService.crearRol( newRol as Rol ).subscribe((response: any) => {
        this.dialog.closeAll();
        this.snackBar.open(response.mensaje, 'Cerrar', {
          duration: 5000
        });
        this.dialogRef.close();
      }, (error: any) => {
        this.dialog.closeAll();
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
    if (this.rolForm.get('nombre')?.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    else if (this.rolForm.get('nombre')?.hasError('minlength')) {
      return 'Nombre no válido';
    }
    else {
      return '';
    }
  }

  // Método para obtener mensajes de errores de validaciones Nombre
  getErrorDepartamentoMessage(): string {
    if (this.rolForm.get('departamento')?.hasError('required')) {
      return 'Debe seleccionar un departamento';
    }
    else {
      return '';
    }
  }

  // Método para obtener mensajes de errores de validaciones Descripción
  getErrorDescripcionMessage(): string {
    if (this.rolForm.get('descripcion')?.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    else if (this.rolForm.get('descripcion')?.hasError('minlength')) {
      return 'Descripción no válida';
    }
    else {
      return '';
    }
  }

}
