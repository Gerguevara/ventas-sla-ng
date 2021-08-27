import { ClienteComponent } from './cliente.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '@guards/login.guard';
import { AuthGuard } from '@guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component:ClienteComponent,
    children:[
      {
        path:'',
        loadChildren: () => import('./index/index.module').then(m => m.IndexModule)
      },
      {
        path:'categoria',
        loadChildren: () => import('./index-categoria/index-categoria.module').then(m => m.IndexCategoriaModule)
      },
      {
        path:'detalle',
        loadChildren: () => import('./index-producto/index-producto.module').then(m => m.IndexProductoModule)
      },
      {
        path:'config',
        loadChildren: () => import('./config-usuario/config-usuario.module').then(m => m.ConfigUsuarioModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
