import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogSpinnerComponent } from './components/dialog-spinner/dialog-spinner.component';
import { DialogMessageComponent } from './components/dialog-message/dialog-message.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    DialogSpinnerComponent,
    DialogMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [
    DialogMessageComponent,
    DialogSpinnerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
