import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPagoComponent } from './components/form-pago/form-pago.component';

const routes: Routes = [
  { path: '', component: FormPagoComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagosRoutingModule { }
