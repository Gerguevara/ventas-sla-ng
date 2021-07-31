import { IndexTableComponent } from './index/index-table/index-table.component';
import { IndexProductCardComponent } from './index/index-product-card/index-product-card.component';
import { IndexContainer } from './index/index/index.container';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    ClienteComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule
  ]
})
export class ClienteModule { }
