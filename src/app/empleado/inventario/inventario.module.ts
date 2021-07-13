import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { InventarioRoutingModule } from './inventario-routing.module';
import { InventarioComponent } from './inventario.component';

@NgModule({
  declarations: [
    InventarioComponent
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule
  ]
})
export class InventarioModule { }
