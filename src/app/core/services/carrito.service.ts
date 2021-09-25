import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PreflightService } from '@tool-services/preflight-service';
import { Injectable } from '@angular/core';
import { ProductoCarrito } from '@models/producto.carrito.model';
import { Producto } from '@models/producto.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarritoService extends PreflightService {
  arregloCarrito: ProductoCarrito[] = [];
  endpoint = environment.endpoints.shoppingCart;
  url = environment.apiUrl;
  constructor(protected httpClient: HttpClient) {
    super()
  }

  agregar(producto: Producto, cantidad: number){
    //si no ha sido agregado
    if(!this.estaEnCarrito(producto)){
      const productoCarrito = {
        id: producto.id,
        cantidad: cantidad
      }
      //agregar id del producto al carrito
      this.arregloCarrito.push(productoCarrito)
    }
    localStorage.setItem('shopping-cart',JSON.stringify(this.arregloCarrito))
  }


  eliminar(producto: Producto){
    //si no ha sido agregado
    if(this.estaEnCarrito(producto)){
      //agregar id del producto al carrito
      this.arregloCarrito = this.arregloCarrito.filter((value)=>value.id!==producto.id);
    }
    localStorage.setItem('shopping-cart',JSON.stringify(this.arregloCarrito))
  }

  estaEnCarrito(producto: Producto): boolean{
    let agregado = false;
    //si ya hay un carrito
    if(this.cargarArreglo()){
      const indice = this.arregloCarrito.findIndex((value: ProductoCarrito) => value.id ===producto.id);
      agregado = indice === -1? false : true;
    }
    return agregado;
  }

  obtenerCantidad(producto: Producto): number{
    let productoCarrito: ProductoCarrito | undefined;
    if(this.cargarArreglo()){
      productoCarrito = this.arregloCarrito.find((value: ProductoCarrito) => value.id ===producto.id);
    }
    const cantidad = productoCarrito? productoCarrito.cantidad : 0;
    return cantidad;
  }

  cargarArreglo(): boolean{
    let carrito = localStorage.getItem('shopping-cart');
    if(carrito){
      this.arregloCarrito = (JSON.parse(carrito) as Array<ProductoCarrito>);
      return true;
    }
    return false;
  }

  requestGet(): Observable<ProductoCarrito>{
    return this.httpClient.get<ProductoCarrito>(`${this.url}${this.endpoint}`, this.setOptions());
  }
}
