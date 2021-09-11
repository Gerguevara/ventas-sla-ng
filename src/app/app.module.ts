import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ToolsModule } from '@tools/tools.module';
import { AuthGuard } from '@guards/auth.guard';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TwofaComponent } from './twofa/twofa.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmDialogTwoFaComponent } from './twofa/confirm-dialog-two-fa/confirm-dialog-two-fa.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RecoverTwoFaComponent } from './twofa/recover-two-fa/recover-two-fa.component';

@NgModule({
  declarations: [
    AppComponent,
    TwofaComponent,
    ConfirmDialogTwoFaComponent,
    RecoverTwoFaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToolsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
