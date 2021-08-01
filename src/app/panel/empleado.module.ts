import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

import { CoreModule } from '@core/core.module';

import { EmpleadoComponent } from './empleado.component';
import { EmpleadoRoutingModule } from './empleado-routing.module';

@NgModule({
  declarations: [
    EmpleadoComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    EmpleadoRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    NgxPermissionsModule.forChild()
  ]
})
export class EmpleadoModule { }
