import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'departamentos',
    loadChildren: () => import('./departamento/departamento.module').then(m => m.DepartamentoModule)
  },
  {
    path: 'roles',
    loadChildren: () => import('./rol/rol.module').then(m => m.RolModule)
  },
  {
    path: 'empleados',
    loadChildren: () => import('./gestion-empleados/gestion-empleados.module').then(m => m.GestionEmpleadosModule)
  },
  { path: '**', pathMatch: 'full', redirectTo: 'roles' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
