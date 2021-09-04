import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { LoginGuard } from '@guards/login.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule)
  },
  {
    path: 'autentication',
    loadChildren: () => import('./autenticacion/autenticacion.module').then(m => m.AutenticacionModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'enterprise',
    loadChildren: () => import('./autenticacion-empresas/autenticacion-empresas.module').then(m => m.AutenticacionEmpresasModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'panel',
    loadChildren: () => import('./panel/empleado.module').then(m => m.EmpleadoModule),
    canLoad: [AuthGuard],
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'panelAdministrativo'
      }
    }
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
