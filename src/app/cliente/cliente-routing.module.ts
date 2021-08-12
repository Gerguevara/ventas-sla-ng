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
        loadChildren: () => import('./index-producto/index-producto.module').then(m => m.IndexProductoModule),
        canLoad: [AuthGuard]
      },
      {
        path:'profile',
        loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then(m => m.PerfilUsuarioModule),
        canLoad: [AuthGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
