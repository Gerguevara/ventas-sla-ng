import { ProductoService } from '@global-services/producto.service';
import { IndexProductoContainer } from './index-producto/index-producto.container';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:':id',
    component:IndexProductoContainer,
    resolve: {
      producto: ProductoService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexProductoRoutingModule { }
