import { InventarioComponent } from './inventario.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: InventarioComponent,
    children: [
      {
        path: 'producto',
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
        redirectTo: 'producto'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }