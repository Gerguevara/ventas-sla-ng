import { Injectable } from '@angular/core';
import { Producto } from '@models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class FormProductoService {

  private producto!: Producto;

  constructor() { }

  public productoMostrarSet( producto: Producto ): void {
    this.producto = producto;
  }

  public productoMostrarGet(): Producto {
    return this.producto;
  }
}
