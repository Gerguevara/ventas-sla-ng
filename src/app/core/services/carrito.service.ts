import { Injectable } from '@angular/core';
import { Producto } from '@models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  arregloCarrito: number[] = [];

  constructor() { }

  agregar(producto: Producto){
    //si no ha sido agregado
    if(!this.estaEnCarrito(producto)){
      //agregar id del producto al carrito
      this.arregloCarrito.push(producto.id)
    }
    localStorage.setItem('shopping-cart',this.arregloCarrito.join(','))
  }


  eliminar(producto: Producto){
    //si no ha sido agregado
    if(this.estaEnCarrito(producto)){
      //agregar id del producto al carrito
      this.arregloCarrito = this.arregloCarrito.filter((value)=>value!==producto.id);
    }
    localStorage.setItem('shopping-cart',this.arregloCarrito.join(','))
  }

  estaEnCarrito(producto: Producto): boolean{
    let agregado = false;
    let carrito = localStorage.getItem('shopping-cart');
    //si ya hay un carrito
    if(carrito){
      //obtener el arreglo de ids de productos del carrito
      carrito.split(',').map(
        //para cada elemento del arreglo
        (value, index)=>{
          //en el arreglo auxiliar, guardar el id actual
          this.arregloCarrito[index] = parseInt(value.trim());
          //si el id actual es el mismo que se intenta agregar
          if(this.arregloCarrito[index] === producto.id){
            //ya esta agregado
            agregado = true;
          }
        }
      );
    }
    return agregado;
  }
}
