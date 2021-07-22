import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from '../../../../../core/Models/rol.model';
import { RolesService } from 'src/app/core/services/roles.service';
import { Permission } from 'src/app/core/Models/permission.model';

@Component({
  selector: 'app-rol-form',
  templateUrl: './rol-form.component.html',
  styleUrls: ['./rol-form.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class RolFormComponent implements OnInit {

  rolForm: FormGroup;
  disableToggles = true;
  enableEdit = false;
  toggles = [ false, false, false, false, false, false, false, false, false, false, false, false,
              false, false, false, false, false, false, false, false, false, false, false, false,
              false, false, false, false, false, false, false, false, false, false, false, false,
              false ];
  permisos: number[] = [];
  newRol!: Rol;

  constructor( private formBuilder: FormBuilder,
               public dialogRef: MatDialogRef<RolFormComponent>,
               @Inject(MAT_DIALOG_DATA) public rol: Rol,
               private roleService: RolesService ) {
    this.rolForm = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: [''],
      permissions: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.rolForm.disable();
    if (this.rol) {
      this.cargarData(this.rol);
    }
  }

  cargarData( rol: Rol ): void {
    this.rolForm.get('id')?.setValue( rol.id );
    this.rolForm.get('nombre')?.setValue( rol.name );
    this.rolForm.get('descripcion')?.setValue( rol.descripcion );
    this.roleService.getPermisos( rol.id ).subscribe((response: Permission[]) => {
      const data = [];
      for ( const item of response ) {
        this.toggles[ item.id - 1 ] = true;
        data.push(item.id);
      }
      this.rolForm.get('permissions')?.setValue(data);
    });
  }

  habilitarPermiso( id: number ): void{
    const index = this.permisos.indexOf(id);
    if (index > -1) {
      console.log(this.permisos);
      this.permisos.splice(index, 1);
      this.rolForm.get('permissions')?.setValue(this.permisos);
    } else {
      console.log(this.permisos);
      this.permisos.push(id);
      this.rolForm.get('permissions')?.setValue(this.permisos);
    }
  }

  editar(): void {
    this.rolForm.enable();
    this.enableEdit = true;
    this.disableToggles = false;
  }

  enviar(): void {
    const newRol = {
      id: this.rolForm.get('id')?.value,
      name: this.rolForm.get('nombre')?.value,
      descripcion: this.rolForm.get('descripcion')?.value,
      guard_name: this.rol.guard_name,
      id_departamento: this.rol.id_departamento,
      permissions: this.rolForm.get('permissions')?.value
    };
    console.log(newRol);
    this.roleService.actualizarRol( newRol as Rol ).subscribe((response: any) => {
      console.log(response);
    }, (error: any) => {
      console.log(error);
    });
    this.dialogRef.close();
  }

}
