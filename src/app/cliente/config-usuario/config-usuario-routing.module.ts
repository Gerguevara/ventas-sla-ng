import { ConfigUsuarioContainerComponent } from './config-usuario-container/config-usuario-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:ConfigUsuarioContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigUsuarioRoutingModule { }
