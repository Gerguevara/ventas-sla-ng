import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartContainerComponent } from './shopping-cart-container/shopping-cart-container.component';
import { ProductoRowComponent } from './producto-row/producto-row.component';
import { ProductRemovedCartComponent } from './product-removed-cart/product-removed-cart.component';


@NgModule({
  declarations: [
    ShoppingCartContainerComponent,
    ProductoRowComponent,
    ProductRemovedCartComponent
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    MatCardModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class ShoppingCartModule { }
