import { BreakpointObserver } from '@angular/cdk/layout';
import { EmpleadoTab } from '@tools/abstracts/empleado-tab.abstract';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EmpleadoService } from '@global-services/empleado.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-empleado-detail-documents',
  templateUrl: './empleado-detail-documents.component.html',
  styleUrls: ['./empleado-detail-documents.component.scss']
})
export class EmpleadoDetailDocumentsComponent extends EmpleadoTab{
  campos = {
    dui: {
      code: 'dui',
      readable: 'DUI del empleado',
    },
    nit: {
      code: 'nit',
      readable: 'NIT del empleado',
    },
    afp:  {
      code: 'afp',
      readable: 'Numero de AFP del empleado',
    },
    isss: {
      code: 'isss',
      readable: 'Numero de ISSS del empleado',
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
    const duiContext = {
      value: this.empleado.dui?this.empleado.dui:'',
      controlName: this.campos.dui.code,
      title: this.campos.dui.readable,
      valueControl: this.duiControl,
    }
    const nitContext = {
      value: this.empleado.nit?this.empleado.nit:"",
      controlName: this.campos.nit.code,
      title: this.campos.nit.readable,
      valueControl: this.nitControl,
    }
    const afpContext = {
      value: this.empleado.afp?this.empleado.afp:"",
      controlName: this.campos.afp.code,
      title: this.campos.afp.readable,
      valueControl: this.afpControl,
    }
    const isssContext = {
      value: this.empleado.isss?this.empleado.isss:"",
      controlName: this.campos.isss.code,
      title: this.campos.isss.readable,
      valueControl: this.isssControl,
    }
    this.contexts.push(duiContext);
    this.contexts.push(nitContext);
    this.contexts.push(afpContext);
    this.contexts.push(isssContext);
  }

  get duiControl(): FormControl{
    return this.formGroup.get(this.campos.dui.code) as FormControl;
  }
  get nitControl(): FormControl{
    return this.formGroup.get(this.campos.nit.code) as FormControl;
  }
  get afpControl(): FormControl{
    return this.formGroup.get(this.campos.afp.code) as FormControl;
  }
  get isssControl(): FormControl{
    return this.formGroup.get(this.campos.isss.code) as FormControl;
  }
}
