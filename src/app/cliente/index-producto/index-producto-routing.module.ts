import { IndexProductoContainer } from './index-producto/index-producto.container';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:':id',
    component:IndexProductoContainer
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexProductoRoutingModule { }
