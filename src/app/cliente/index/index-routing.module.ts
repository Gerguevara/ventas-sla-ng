import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TwoFaBlockGuard } from '@guards/two-fa-block.guard';
import { IndexContainer } from './index/index.container';

const routes: Routes = [
  {
    path: '',
    component: IndexContainer,
    canActivate: [TwoFaBlockGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
