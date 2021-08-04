import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { PerfilEmpleado } from '@models/perfil.empleado.model';
import { EmpleadoTab } from '@tools/abstracts/empleado-tab.abstract';

@Component({
  selector: 'app-empleado-detail-corporate',
  templateUrl: './empleado-detail-corporate.component.html',
  styleUrls: ['./empleado-detail-corporate.component.scss']
})
export class EmpleadoDetailCorporateComponent extends EmpleadoTab {

  constructor(protected breakpointObserver: BreakpointObserver) {
    super(breakpointObserver);
  }

  ngOnInit(): void {
  }

}
