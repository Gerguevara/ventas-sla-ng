import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarRatingModule } from "ngx-bar-rating";
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

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
    BarRatingModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatGridListModule
  ],
  exports: [
    IndexProductCardComponent
  ]
})
export class IndexModule { }
