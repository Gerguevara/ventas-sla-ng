import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../../../core/Models/categoria.model';
import { Producto } from '../../models/producto.models';

export interface ProductoPost {
  id_categoria: number;
  nombre_producto: string;
  descripcion_producto: string;
  disponibilidad: string;
  imagen: string;
  precio: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor( private http: HttpClient ) {
    console.log('Running Product Service...');
  }

  /*
  Emisor que nos servirá para comunicar el producto seleccionado en la tabla
  para que sea visualizado en el formulario
  */
  productoChange$ = new EventEmitter<Producto>();

  /*
  Este es un método para el manejo de la subida de la imagen del producto.
  Por el momento se realiza en un servidor personal que devuelve como respuesta
  la URL de la imagen
   */
  subirImagen( form: any ): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': token
      })
    };
    return this.http.post<any>('http://d9771c35d78d.eu.ngrok.io/upload.php', JSON.stringify(form.value), httpHeaders);
  }

  /*
  Este es un método para hacer post a la API con los datos necesarios
  para la creación de un nuevo producto
  */
  crearProducto( producto: ProductoPost ): any {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': token
      })
    };
    return this.http.post<any>('http://localhost:8000/api/productos', producto, httpHeaders);
  }

  actualizarProducto( producto: Producto ): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': token
      })
    };
    return this.http.put<any>('http://localhost:8000/api/productos/' + producto.id, JSON.stringify(producto), httpHeaders);
  }

  eliminarProducto( producto: Producto ): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': token
      })
    };
    return this.http.delete<any>('http://localhost:8000/api/productos/' + producto.id, httpHeaders);
  }

  obtenerCategoriaProducto( id: number ): Observable<Categoria> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': token
      })
    };
    return this.http.get<Categoria>('http://localhost:8000/api/categorias/' + id, httpHeaders);
  }

}
