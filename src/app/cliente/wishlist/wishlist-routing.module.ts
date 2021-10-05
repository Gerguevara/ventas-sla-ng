import { WishlistService } from './../../core/services/wishlist.service';
import { WishlistContainerComponent } from './wishlist-container/wishlist-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: WishlistContainerComponent,
    resolve: WishlistService
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WishlistRoutingModule { }
