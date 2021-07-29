import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado.component';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoComponent,
    children:
    [
      {
        path: 'empleados',
        loadChildren: () => import('./empleados/empleados.module').then(m => m.EmpleadosModule)
      },
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
        redirectTo: 'empleados'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }
