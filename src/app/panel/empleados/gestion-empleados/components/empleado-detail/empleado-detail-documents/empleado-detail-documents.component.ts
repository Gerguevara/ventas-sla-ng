import { BreakpointObserver } from '@angular/cdk/layout';
import { EmpleadoTab } from '@tools/abstracts/empleado-tab.abstract';
import { Component, Input, OnInit } from '@angular/core';
import { PerfilEmpleado } from '@models/perfil.empleado.model';

@Component({
  selector: 'app-empleado-detail-documents',
  templateUrl: './empleado-detail-documents.component.html',
  styleUrls: ['./empleado-detail-documents.component.scss']
})
export class EmpleadoDetailDocumentsComponent extends EmpleadoTab{

  constructor(protected breakpointObserver: BreakpointObserver) {
    super(breakpointObserver);
  }
  ngOnInit(): void {
  }

}
