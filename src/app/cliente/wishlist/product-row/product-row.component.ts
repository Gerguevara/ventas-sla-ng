import { CarritoService } from '@global-services/carrito.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductRemovedCartComponent } from '@cliente/shopping-cart/product-removed-cart/product-removed-cart.component';
import { Producto } from '@models/producto.model';
import { WishlistService } from '@global-services/wishlist.service';

@Component({
  selector: 'sla-product-row',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.scss']
})
export class ProductRowComponent implements OnInit {
  @Input()
  product!: Producto;
  @Input()
  quantity!: number;
  @Output()
  deleteEmitter: EventEmitter<number> = new EventEmitter();

  constructor(
    private carritoService: CarritoService,
    private wishlistService: WishlistService,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    if(this.product.disponibilidad===0 || this.product.cantidad === 0){}
  }

  deleteHandler($event: any){
    $event.preventDefault(); $event.stopPropagation();
    // this.wishlistService.eliminar(this.product);
    this.deleteEmitter.emit(this.product.id);
  }

  addToCartHandler($event: any){
    $event.preventDefault(); $event.stopPropagation();
    //falta manejar cantidad
    this.carritoService.agregar(this.product, 1);
  }

}
