import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';

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
    MatListModule,
    MatGridListModule
  ],
  exports: [
    IndexProductCardComponent
  ]
})
export class IndexModule { }
