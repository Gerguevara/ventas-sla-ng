import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexProductoRoutingModule } from './index-producto-routing.module';
import { IndexProductoContainer } from './index-producto/index-producto.container';


@NgModule({
  declarations: [
    IndexProductoContainer
  ],
  imports: [
    CommonModule,
    IndexProductoRoutingModule,
    MatListModule
  ]
})
export class IndexProductoModule { }
