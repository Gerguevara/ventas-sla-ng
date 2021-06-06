import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormProductoComponent } from './components/form-producto/form-producto.component';

const routes: Routes = [
  { path: 'form-producto', component: FormProductoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'form-producto' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
