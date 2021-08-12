import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilUsuarioRoutingModule } from './perfil-usuario-routing.module';
import { IndexPerfilComponent } from './components/index-perfil/index-perfil.component';


@NgModule({
  declarations: [
    IndexPerfilComponent
  ],
  imports: [
    CommonModule,
    PerfilUsuarioRoutingModule
  ]
})
export class PerfilUsuarioModule { }
