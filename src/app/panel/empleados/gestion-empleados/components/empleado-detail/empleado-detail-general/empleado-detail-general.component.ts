import { BreakpointObserver } from '@angular/cdk/layout';
import { EmpleadoTab } from '@tools/abstracts/empleado-tab.abstract';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EmpleadoService } from '@global-services/empleado.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-empleado-detail-general',
  templateUrl: './empleado-detail-general.component.html',
  styleUrls: ['./empleado-detail-general.component.scss']
})
export class EmpleadoDetailGeneralComponent extends EmpleadoTab{
  campos = {
    genero: {
      code: 'genero',
      readable: 'Género del empleado',
    },
    direccion: {
      code: 'direccion',
      readable: 'Dirección del empleado',
    },
    telefono:  {
      code: 'telefono',
      readable: 'Numero de telefono del empleado',
    },
    estadoCivil: {
      code: 'estadoCivil',
      readable: 'Estado civil del empleado',
    },
  }

  constructor(
    protected breakpointObserver: BreakpointObserver,
    protected empleadoService: EmpleadoService,
    protected matSnackBar: MatSnackBar,
    ) {
    super(breakpointObserver, empleadoService, matSnackBar);
  }

  ngOnInit(){
    super.ngOnInit();
    const generoContext = {
      value: this.empleado.genero?this.empleado.genero:"",
      controlName: this.campos.genero.code,
      title: this.campos.genero.readable,
      valueControl: this.generoControl,
    }
    const direccionContext = {
      value: this.empleado.direccion?this.empleado.direccion:"",
      controlName: this.campos.direccion.code,
      title: this.campos.direccion.readable,
      valueControl: this.direccionControl,
    }
    const telefonoContext = {
      value: this.empleado.telefono?this.empleado.telefono:"",
      controlName: this.campos.telefono.code,
      title: this.campos.telefono.readable,
      valueControl: this.telefonoControl,
    }
    const estadoCivilContext = {
      value: this.empleado.estadoCivil?this.empleado.estadoCivil:"",
      controlName: this.campos.estadoCivil.code,
      title: this.campos.estadoCivil.readable,
      valueControl: this.estadoCivilControl,
    }
    this.contexts.push(generoContext);
    this.contexts.push(direccionContext);
    this.contexts.push(telefonoContext);
    this.contexts.push(estadoCivilContext);

  }

  get generoControl(): FormControl{
    return this.formGroup.get('genero') as FormControl;
  }
  get direccionControl(): FormControl{
    return this.formGroup.get('direccion') as FormControl;
  }
  get telefonoControl(): FormControl{
    return this.formGroup.get('telefono') as FormControl;
  }
  get estadoCivilControl(): FormControl{
    return this.formGroup.get('estadoCivil') as FormControl;
  }
}
