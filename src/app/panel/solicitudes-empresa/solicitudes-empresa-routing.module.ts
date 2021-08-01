import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexSolicitudesComponent } from './components/index-solicitudes/index-solicitudes.component';

const routes: Routes = [
  { path: 'index', component: IndexSolicitudesComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'index' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesEmpresaRoutingModule { }
