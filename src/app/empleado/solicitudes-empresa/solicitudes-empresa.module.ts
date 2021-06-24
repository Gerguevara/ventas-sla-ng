import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesEmpresaRoutingModule } from './solicitudes-empresa-routing.module';
import { IndexSolicitudesComponent } from './components/index-solicitudes/index-solicitudes.component';
import { MostraSolicitudComponent } from './components/mostra-solicitud/mostra-solicitud.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ToolsModule } from '../../tools/tools.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    IndexSolicitudesComponent,
    MostraSolicitudComponent
  ],
  imports: [
    CommonModule,
    ToolsModule,
    SolicitudesEmpresaRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatSnackBarModule
  ]
})
export class SolicitudesEmpresaModule { }
