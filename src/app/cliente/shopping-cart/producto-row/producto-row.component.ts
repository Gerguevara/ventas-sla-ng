import { ProductRemovedCartComponent } from './../product-removed-cart/product-removed-cart.component';
import { MatDialog } from '@angular/material/dialog';
import { CarritoService } from '@global-services/carrito.service';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Producto } from 'src/app/core/models/producto.model';

@Component({
  selector: 'sla-producto-row',
  templateUrl: './producto-row.component.html',
  styleUrls: ['./producto-row.component.scss']
})
export class ProductoRowComponent implements OnInit {
  @Input()
  product!: Producto;
  @Input()
  quantity!: number;
  @Output()
  deleteEmitter: EventEmitter<number> = new EventEmitter();

  constructor(
    private carritoService: CarritoService,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    if(this.product.disponibilidad===0 || this.product.cantidad === 0){
      this.carritoService.eliminar(this.product);
      const dialogRef = this.matDialog.open(
        ProductRemovedCartComponent,
        {
          data: this.product
        }
      )
      dialogRef.afterClosed().subscribe(
        {
          next:()=>{
            this.deleteEmitter.emit(this.product.id);
          }
        }
      )
    }
  }

  deleteHandler($event: any){
    $event.preventDefault(); $event.stopPropagation();
    this.carritoService.eliminar(this.product);
    this.deleteEmitter.emit(this.product.id);
  }

  get totalRow(){
    return Number(this.product.precio)*this.quantity;
  }

}
