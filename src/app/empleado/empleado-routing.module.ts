import { EmpleadoComponent } from './empleado.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:EmpleadoComponent,
    children:
    [
      {
        path: 'index',
        loadChildren: () => import('./producto/producto.module').then(m => m.ProductoModule)
      },
      {
        path: 'categoria',
        loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaModule)
      },
      {
        path: 'etiqueta',
        loadChildren: () => import('./etiqueta/etiqueta.module').then(m => m.EtiquetaModule)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'index'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }
