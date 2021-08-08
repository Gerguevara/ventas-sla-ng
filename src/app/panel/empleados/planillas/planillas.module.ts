import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanillasRoutingModule } from './planillas-routing.module';
import { PlanillasIndexComponent } from './components/planillas-index/planillas-index.component';
import { PlanillasFormComponent } from './components/planillas-form/planillas-form.component';


@NgModule({
  declarations: [
    PlanillasIndexComponent,
    PlanillasFormComponent
  ],
  imports: [
    CommonModule,
    PlanillasRoutingModule
  ]
})
export class PlanillasModule { }
