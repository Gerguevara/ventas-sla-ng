import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { IndexCategoriaRoutingModule } from './index-categoria-routing.module';
import { IndexCategoriaContainer } from './index-categoria/index-categoria.container';
import { IndexModule } from '../index/index.module';


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
