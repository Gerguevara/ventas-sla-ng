import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Producto } from '@models/producto.model';
import { ProductoCarrito } from '@models/producto.carrito.model';
import { ResultadoCarrito } from '@models/resultados/resultado-carrito.model';
import { CarritoService } from '@global-services/carrito.service';

@Component({
  selector: 'sla-shopping-cart-container',
  templateUrl: './shopping-cart-container.component.html',
  styleUrls: ['./shopping-cart-container.component.scss']
})
export class ShoppingCartContainerComponent implements OnInit {
  productos: Producto[] = [];
  subtotal!: number;
  iva!: number;
  total!: number;
  retrieved: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private carritoService: CarritoService,
    private matSnackBar: MatSnackBar,
  ) {
    this.route.data.subscribe(
      {
        next: (response: any) => {
          const result = (response.productos as ResultadoCarrito);
          this.productos = result.Productos;
          this.subtotal = result.Resumen.Subtotal;
          this.iva = result.Resumen.IVA;
          this.total = result.Resumen.Total;
          this.retrieved = true;
      }
    })
  }

  ngOnInit(): void {
  }

  getCartProductQuantity(id: number): number{
    const arrCarrito = this.carritoService.obtenerCarrito();
    const cartProduct = arrCarrito.find((value:ProductoCarrito)=>{return value.id === id});
    console.log(cartProduct)
    return cartProduct? cartProduct.cantidad : 0;
  }

  handleDelete(id: number){
    this.productos = this.productos.filter((value:Producto)=>{return value.id!==id})
    this.matSnackBar.open('Producto retirado del carrito', 'Cerrar', {duration:3000})
  }

}
