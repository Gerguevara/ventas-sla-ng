import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule)
  },
  {
    path: 'autentication',
    loadChildren: () => import('./autenticacion/autenticacion.module').then(m => m.AutenticacionModule)
  },
  {
    path: 'panel',
    loadChildren: () => import('./empleado/empleado.module').then(m => m.EmpleadoModule),
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
