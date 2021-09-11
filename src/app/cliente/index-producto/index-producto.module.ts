import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexProductoRoutingModule } from './index-producto-routing.module';
import { IndexProductoContainer } from './index-producto/index-producto.container';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    IndexProductoContainer
  ],
  imports: [
    CommonModule,
    IndexProductoRoutingModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
  ]
})
export class IndexProductoModule { }
