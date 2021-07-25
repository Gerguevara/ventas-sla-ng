import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ToolsModule } from './tools/tools.module';
import { AuthGuard } from './guards/auth.guard';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToolsModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
