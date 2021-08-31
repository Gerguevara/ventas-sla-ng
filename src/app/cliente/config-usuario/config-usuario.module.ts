import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { EmailComponent } from './components/email/email.component';
import { PasswordComponent } from './components/password/password.component';
import { TwofaComponent } from './components/twofa/twofa.component';

import { ConfigUsuarioRoutingModule } from './config-usuario-routing.module';
import { ConfigUsuarioContainerComponent } from './config-usuario-container/config-usuario-container.component';

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
    ReactiveFormsModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
  ]
})
export class ConfigUsuarioModule { }
