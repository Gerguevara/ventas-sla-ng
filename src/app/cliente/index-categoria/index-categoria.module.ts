import { MatCardModule } from '@angular/material/card';
import { IndexProductCardComponent } from './../index/index-product-card/index-product-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexCategoriaRoutingModule } from './index-categoria-routing.module';
import { IndexCategoriaContainer } from './index-categoria/index-categoria.container';
import { IndexModule } from '../index/index.module';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    IndexCategoriaContainer
  ],
  imports: [
    CommonModule,
    IndexCategoriaRoutingModule,
    MatGridListModule,
    MatCardModule,
    IndexModule,
  ]
})
export class IndexCategoriaModule { }
