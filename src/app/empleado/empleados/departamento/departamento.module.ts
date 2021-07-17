import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoFormComponent } from './components/departamento-form/departamento-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartamentoComponent } from './departamento.component';
import { DepartamentoContainerComponent } from './departamento-container/departamento-container.component';
import { DepartamentoTableComponent } from './components/departamento-table/departamento-table.component';


@NgModule({
  declarations: [
    DepartamentoFormComponent,
    DepartamentoComponent,
    DepartamentoContainerComponent,
    DepartamentoTableComponent
  ],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSnackBarModule
  ]
})
export class DepartamentoModule { }
