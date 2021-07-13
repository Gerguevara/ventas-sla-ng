import { EmpleadoComponent } from './empleado.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoComponent,
    children:
    [
      {
        path: 'inventario',
        loadChildren: () => import('./inventario/inventario.module').then(m => m.InventarioModule)
      },
      {
        path: 'solicitudesEmpresa',
        loadChildren: () => import('./solicitudes-empresa/solicitudes-empresa.module').then(m => m.SolicitudesEmpresaModule)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'inventario'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }
