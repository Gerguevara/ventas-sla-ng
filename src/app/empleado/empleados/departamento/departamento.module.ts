import { MatListModule } from '@angular/material/list';
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
import { DepartamentoConfirmationDialogComponent } from './components/departamento-confirmation-dialog/departamento-confirmation-dialog.component';
import { DepartamentoDetailsComponent } from './components/departamento-details/departamento-details.component';
import { MatRippleModule } from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    DepartamentoFormComponent,
    DepartamentoComponent,
    DepartamentoContainerComponent,
    DepartamentoTableComponent,
    DepartamentoConfirmationDialogComponent,
    DepartamentoDetailsComponent
  ],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
    ReactiveFormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSnackBarModule,
    MatRippleModule,
    MatSlideToggleModule
  ]
})
export class DepartamentoModule { }
