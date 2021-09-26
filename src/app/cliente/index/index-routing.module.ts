import { CategoriaService } from '@global-services/categoria.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexService } from '@global-services/index.service';
import { TwoFaBlockGuard } from '@guards/two-fa-block.guard';
import { IndexContainer } from './index/index.container';

const routes: Routes = [
  {
    path: '',
    component: IndexContainer,
    resolve: {
      resultados: IndexService,
      categorias: CategoriaService,
    },
    canActivate: [TwoFaBlockGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
