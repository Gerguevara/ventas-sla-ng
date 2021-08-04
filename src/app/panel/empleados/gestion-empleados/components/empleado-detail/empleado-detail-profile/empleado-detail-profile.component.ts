import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { environment } from '@environments/environment';
import { PerfilEmpleado } from '@models/perfil.empleado.model';
import { EmpleadoTab } from '@tools/abstracts/empleado-tab.abstract';

@Component({
  selector: 'app-empleado-detail-profile',
  templateUrl: './empleado-detail-profile.component.html',
  styleUrls: ['./empleado-detail-profile.component.scss']
})
export class EmpleadoDetailProfileComponent extends EmpleadoTab{

  constructor(protected breakpointObserver: BreakpointObserver) {
    super(breakpointObserver);

  }
}
