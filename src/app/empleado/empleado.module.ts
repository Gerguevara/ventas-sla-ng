import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadoRoutingModule } from './empleado-routing.module';
import { EmpleadoComponent } from './empleado.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { CoreModule } from '../core/core.module';


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
    MatExpansionModule
  ]
})
export class EmpleadoModule { }
