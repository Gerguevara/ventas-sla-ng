import { IndexCategoriaContainer } from './index-categoria/index-categoria.container';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:':id',
    component:IndexCategoriaContainer
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexCategoriaRoutingModule { }
