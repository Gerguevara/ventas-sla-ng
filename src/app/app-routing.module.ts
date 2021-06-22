import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutenticacionEmpresasModule } from './autenticacion-empresas/autenticacion-empresas.module';

const routes: Routes = [
  {
    path: '',
    component:IndexComponent
  },
  {
    path: 'autentication',
    loadChildren: () => import('./autenticacion/autenticacion.module').then(m => m.AutenticacionModule)
  },
  {
    path: 'enterprise',
    loadChildren: () => import('./autenticacion-empresas/autenticacion-empresas.module').then(m => m.AutenticacionEmpresasModule)
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
