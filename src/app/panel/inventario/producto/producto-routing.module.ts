import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexProductoComponent } from './components/index-producto/index-producto.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  { path: '', component: IndexProductoComponent},
  {
    path: 'kardex',
    loadChildren: () => import('./kardex/kardex.module').then(m => m.KardexModule),
  },
  {
    path: 'mostrar',
    loadChildren: () => import('./components/form-producto/form-producto.module').then(m => m.FormProductoModule),
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'productos.show'
      }
    }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
