import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'autentication',
    loadChildren: () => import('./autenticacion/autenticacion.module').then(m => m.AutenticacionModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./empleado/empleado.module').then(m => m.EmpleadoModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'autentication'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
