import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexProductoComponent } from './components/index-producto/index-producto.component';

const routes: Routes = [
  { path: '', component: IndexProductoComponent},
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
