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

@NgModule({
  declarations: [
    PlanillasIndexComponent,
    PlanillasFormComponent,
    LineaPlanillasTableComponent
  ],
  imports: [
    CommonModule,
    ToolsModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    PlanillasRoutingModule
  ]
})
export class PlanillasModule { }
