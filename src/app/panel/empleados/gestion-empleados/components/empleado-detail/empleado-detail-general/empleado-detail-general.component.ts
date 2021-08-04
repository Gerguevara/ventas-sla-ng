import { BreakpointObserver } from '@angular/cdk/layout';
import { EmpleadoTab } from '@tools/abstracts/empleado-tab.abstract';
import { Component, Input, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { PerfilEmpleado } from '@models/perfil.empleado.model';

@Component({
  selector: 'app-empleado-detail-general',
  templateUrl: './empleado-detail-general.component.html',
  styleUrls: ['./empleado-detail-general.component.scss']
})
export class EmpleadoDetailGeneralComponent extends EmpleadoTab{
  constructor(protected breakpointObserver: BreakpointObserver) {
    super(breakpointObserver);
  }
}
