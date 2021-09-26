import { BreakpointObserver } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { EmpleadoTab } from '@tools/abstracts/empleado-tab.abstract';
import { EmpleadoService } from '@global-services/empleado.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-empleado-detail-profile',
  templateUrl: './empleado-detail-profile.component.html',
  styleUrls: ['./empleado-detail-profile.component.scss']
})
export class EmpleadoDetailProfileComponent extends EmpleadoTab{
  campos = {
    nombres: {
      code: 'nombres',
      readable: 'Nombres del empleado',
    },
    apellidos: {
      code: 'apellidos',
      readable: 'Apellidos del empleado',
    },
    email:  {
      code: 'email',
      readable: 'Email asociado',
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
    const nombresContext = {
      value: this.empleado.nombres?this.empleado.nombres:"",
      controlName: this.campos.nombres.code,
      title: this.campos.nombres.readable,
      valueControl: this.nombresControl,
    }
    const apellidosContext = {
      value: this.empleado.apellidos?this.empleado.apellidos:"",
      controlName: this.campos.apellidos.code,
      title: this.campos.apellidos.readable,
      valueControl: this.apellidosControl,
    }
    const emailContext = {
      value: this.empleado.email,
      controlName: this.campos.email.code,
      title: this.campos.email.readable,
      valueControl: this.emailControl,
    }
    this.contexts.push(nombresContext);
    this.contexts.push(apellidosContext);
    this.contexts.push(emailContext);
  }

  get nombresControl(): FormControl{
    return this.formGroup.get('nombres') as FormControl;
  }
  get apellidosControl(): FormControl{
    return this.formGroup.get('apellidos') as FormControl;
  }
  get emailControl(): FormControl{
    return this.formGroup.get('email') as FormControl;
  }


}
