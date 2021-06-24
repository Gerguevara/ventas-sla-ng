import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { IndexRoutingModule } from './index-routing.module';
import { IndexContainer } from './index/index.container';
import { IndexTableComponent } from './index-table/index-table.component';
import { IndexProductCardComponent } from './index-product-card/index-product-card.component';


@NgModule({
  declarations: [
    IndexContainer,
    IndexTableComponent,
    IndexProductCardComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    MatCardModule,
    MatListModule
  ]
})
export class IndexModule { }
