import { CategoriasIndexService } from './../core/services/Resolvers/categorias-index.service';
import { ClienteComponent } from './cliente.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { TwoFaBlockGuard } from '@guards/two-fa-block.guard';

const routes: Routes = [
  {
    path: '',
    component:ClienteComponent,
    children:[
      {
        path:'',
        loadChildren: () => import('./index/index.module').then(m => m.IndexModule),
        canLoad: []
      },
      {
        path:'categoria',
        loadChildren: () => import('./index-categoria/index-categoria.module').then(m => m.IndexCategoriaModule),
        canLoad: [TwoFaBlockGuard]
      },
      {
        path:'detalle',
        loadChildren: () => import('./index-producto/index-producto.module').then(m => m.IndexProductoModule),
        canLoad: [TwoFaBlockGuard]
      },
      {
        path:'config',
        loadChildren: () => import('./config-usuario/config-usuario.module').then(m => m.ConfigUsuarioModule),
        canLoad: [AuthGuard, TwoFaBlockGuard]
      },
      {
        path:'payments',
        loadChildren: () => import('./pagos/pagos.module').then(m => m.PagosModule),
        canLoad: [AuthGuard, TwoFaBlockGuard]
      },
      {
        path:'shopping-cart',
        loadChildren: () => import('./shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule),
        canLoad: [TwoFaBlockGuard]
      },
      {
        path:'wishlist',
        loadChildren: () => import('./wishlist/wishlist.module').then(m => m.WishlistModule),
        canLoad: [AuthGuard, TwoFaBlockGuard]
      }
    ],
    resolve:
    {
      categorias : CategoriasIndexService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
