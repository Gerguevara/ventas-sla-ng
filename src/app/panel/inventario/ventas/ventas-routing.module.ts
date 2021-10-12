import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasIndexComponent } from './components/ventas-index/ventas-index.component';
import { VentasReportComponent } from './components/ventas-report/ventas-report.component';

const routes: Routes = [
  { path: '', component: VentasIndexComponent },
  { path: 'report', component: VentasReportComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
