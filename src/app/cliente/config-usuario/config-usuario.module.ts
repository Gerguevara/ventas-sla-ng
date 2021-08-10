import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigUsuarioRoutingModule } from './config-usuario-routing.module';
import { ConfigUsuarioContainerComponent } from './config-usuario-container/config-usuario-container.component';


@NgModule({
  declarations: [
    ConfigUsuarioContainerComponent
  ],
  imports: [
    CommonModule,
    ConfigUsuarioRoutingModule
  ]
})
export class ConfigUsuarioModule { }
