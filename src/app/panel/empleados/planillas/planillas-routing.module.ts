import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanillasIndexComponent } from './components/planillas-index/planillas-index.component';

const routes: Routes = [
  { path: '' , component: PlanillasIndexComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanillasRoutingModule { }
