import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TwofaComponent } from './twofa/twofa.component';
import { AuthGuard } from '@guards/auth.guard';
import { LoginGuard } from '@guards/login.guard';
import { RolGuard } from '@guards/rol.guard';
import { TwoFaGuard } from '@guards/two-fa.guard';
import { TwoFaBlockGuard } from '@guards/two-fa-block.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
    canLoad: []
  },
  {
    path: 'auth',
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
    canLoad: [AuthGuard, RolGuard, TwoFaBlockGuard]
  },
  {
    path: 'confirm',
    component: TwofaComponent,
    canActivate: [TwoFaGuard],
    canDeactivate: [TwoFaGuard]
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
