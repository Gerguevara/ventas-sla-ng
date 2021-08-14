import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigUsuarioRoutingModule } from './config-usuario-routing.module';
import { ConfigUsuarioContainerComponent } from './config-usuario-container/config-usuario-container.component';

import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { EmailComponent } from './components/email/email.component';
import { PasswordComponent } from './components/password/password.component';
import { TwofaComponent } from './components/twofa/twofa.component';

@NgModule({
  declarations: [
    ConfigUsuarioContainerComponent,
    EmailComponent,
    PasswordComponent,
    TwofaComponent
  ],
  imports: [
    CommonModule,
    ConfigUsuarioRoutingModule,
    MatListModule,
    MatExpansionModule,
  ]
})
export class ConfigUsuarioModule { }
