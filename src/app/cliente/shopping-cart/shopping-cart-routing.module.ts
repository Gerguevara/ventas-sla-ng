import { ShoppingCartContainerComponent } from './shopping-cart-container/shopping-cart-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoService } from '@global-services/carrito.service';

const routes: Routes = [
  {
    path:'',
    component: ShoppingCartContainerComponent,
    resolve: {
      productos: CarritoService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingCartRoutingModule { }
