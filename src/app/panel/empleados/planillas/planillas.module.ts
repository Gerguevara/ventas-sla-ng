import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanillasRoutingModule } from './planillas-routing.module';
import { PlanillasIndexComponent } from './components/planillas-index/planillas-index.component';
import { PlanillasFormComponent } from './components/planillas-form/planillas-form.component';
import { ToolsModule } from '../../../tools/tools.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    PlanillasIndexComponent,
    PlanillasFormComponent
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
