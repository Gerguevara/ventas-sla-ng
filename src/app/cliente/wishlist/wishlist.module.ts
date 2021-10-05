import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistContainerComponent } from './wishlist-container/wishlist-container.component';
import { ProductRowComponent } from './product-row/product-row.component';


@NgModule({
  declarations: [
    WishlistContainerComponent,
    ProductRowComponent
  ],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class WishlistModule { }
