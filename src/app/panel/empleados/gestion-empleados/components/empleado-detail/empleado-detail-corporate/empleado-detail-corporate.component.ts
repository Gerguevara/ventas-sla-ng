import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpleadoService } from '@global-services/empleado.service';
import { EmpleadoTab } from '@tools/abstracts/empleado-tab.abstract';

@Component({
  selector: 'app-empleado-detail-corporate',
  templateUrl: './empleado-detail-corporate.component.html',
  styleUrls: ['./empleado-detail-corporate.component.scss']
})
export class EmpleadoDetailCorporateComponent extends EmpleadoTab {
  campos = {
    nivelEstudios: {
      code: 'estudios',
      readable: 'Nivel de estudios alcanzado',
    },
    salario: {
      code: 'salario',
      readable: 'Salario mensual actual del empleado',
    },
    fechaInicio:  {
      code: 'inicio',
      readable: 'Fecha de Inicio del empleado en SLA',
    },
  }

  constructor(
    protected breakpointObserver: BreakpointObserver,
    protected empleadoService: EmpleadoService,
    protected matSnackBar: MatSnackBar,
    ) {
    super(breakpointObserver, empleadoService, matSnackBar);
  }

  ngOnInit(): void {
    super.ngOnInit();
    const nivelEstudiosContext = {
      value: this.empleado.estudios?this.empleado.estudios:'',
      controlName: this.campos.nivelEstudios.code,
      title: this.campos.nivelEstudios.readable,
      valueControl: this.nivelEstudiosControl,
    }
    const salarioContext = {
      value: this.empleado.salario?this.empleado.salario:"",
      controlName: this.campos.salario.code,
      title: this.campos.salario.readable,
      valueControl: this.salarioControl,
    }
    const fechaInicioContext = {
      value: this.empleado.inicio?this.empleado.inicio:"",
      controlName: this.campos.fechaInicio.code,
      title: this.campos.fechaInicio.readable,
      valueControl: this.fechaInicioControl,
    }
    this.contexts.push(nivelEstudiosContext);
    this.contexts.push(salarioContext);
    this.contexts.push(fechaInicioContext);
  }

  get nivelEstudiosControl(): FormControl{
    return this.formGroup.get(this.campos.nivelEstudios.code) as FormControl;
  }
  get salarioControl(): FormControl{
    return this.formGroup.get(this.campos.salario.code) as FormControl;
  }
  get fechaInicioControl(): FormControl{
    return this.formGroup.get(this.campos.fechaInicio.code) as FormControl;
  }
}
