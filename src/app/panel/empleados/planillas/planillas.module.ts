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
import { CreatePlanillaFormComponent } from './components/create-planilla-form/create-planilla-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    PlanillasIndexComponent,
    PlanillasFormComponent,
    LineaPlanillasTableComponent,
    CreatePlanillaFormComponent
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
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatDialogModule,
    PlanillasRoutingModule
  ]
})
export class PlanillasModule { }
