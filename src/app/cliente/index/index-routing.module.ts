import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexContainer } from './index/index.container';

const routes: Routes = [
  {
    path: '',
    component: IndexContainer
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
