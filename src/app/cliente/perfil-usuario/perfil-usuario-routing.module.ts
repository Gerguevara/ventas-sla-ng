import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPerfilComponent } from './components/index-perfil/index-perfil.component';

const routes: Routes = [
  { path: '', component: IndexPerfilComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilUsuarioRoutingModule { }
