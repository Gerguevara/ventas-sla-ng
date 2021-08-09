import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanillasRoutingModule } from './planillas-routing.module';
import { PlanillasIndexComponent } from './components/planillas-index/planillas-index.component';
import { PlanillasFormComponent } from './components/planillas-form/planillas-form.component';
import { ToolsModule } from '../../../tools/tools.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { LineaPlanillasTableComponent } from './components/linea-planillas-table/linea-planillas-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    PlanillasIndexComponent,
    PlanillasFormComponent,
    LineaPlanillasTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToolsModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    PlanillasRoutingModule
  ]
})
export class PlanillasModule { }
