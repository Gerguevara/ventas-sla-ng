import { Injectable } from '@angular/core';
import { Producto } from '@models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() { }

  agregarCarrito(producto: Producto){
    let carrito = localStorage.getItem('shopping-cart');
    let arregloCarrito: number[] = [];
    let agregado = false;
    //si ya hay un carrito
    if(carrito){
      //obtener el arreglo de ids de productos del carrito
      carrito.split(',').map(
        //para cada elemento del arreglo
        (value, index)=>{
          //en el arreglo auxiliar, guardar el id actual
          arregloCarrito[index] = parseInt(value.trim());
          //si el id actual es el mismo que se intenta agregar
          if(arregloCarrito[index] === producto.id){
            //ya esta agregado
            agregado = true;
          }
        }
      );
    }
    //si no ha sido agregado
    if(!agregado){
      //agregar id del producto al carrito
      arregloCarrito.push(producto.id)
    }
    localStorage.setItem('shopping-cart',arregloCarrito.join(','))
  }
}
