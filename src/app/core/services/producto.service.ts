import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Categoria } from '@models/categoria.model';
import { Producto } from '@models/producto.model';
import { Resultado } from '@models/resultados/resultado.model';
import { RecursoService } from './recurso.service';
import { environment } from '@environments/environment';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

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
export class ProductoService  extends RecursoService<Producto> implements Resolve<Producto>{

  private endpoint = environment.endpoints.productos;

  constructor(protected httpClient: HttpClient) {
    super(environment.endpoints.productos, httpClient);
  }
  /*
  Emisor que nos servirá para comunicar el producto seleccionado en la tabla
  para que sea visualizado en el formulario
  */
  // productoChange$ = new EventEmitter<Producto>();
  // productoChange!: Producto;
  productoChange: Producto = {
    id: 0,
    id_categoria: 1,
    nombre_producto: '',
    descripcion_producto: '',
    precio: '0.00',
    cantidad: 0,
    disponibilidad: 0,
    imagen: '',
    calificacion_promedio: ''
  };
  enableFormFlag = false;

  /*
  Este es un método para el manejo de la subida de la imagen del producto.
  Por el momento se realiza en un servidor personal que devuelve como respuesta
  la URL de la imagen
   */

  async uploadImage( form: any ): Promise<any> {
    const response = await this.httpClient.post(
      `${environment.apiUrl}${this.endpoint}/uploadImage/`, form, this.setOptions()).toPromise();
    return response;
  }

  deleteImage(path: string): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}${this.endpoint}/deleteImage`, { path }, this.setOptions());
  }

  /*
  Este es un método para hacer post a la API con los datos necesarios
  para la creación de un nuevo producto
  */
  crearProducto( producto: ProductoPost ): any {
    return this.httpClient.post<any>(`${environment.apiUrl}${this.endpoint}`, producto, this.setOptions());
  }

  actualizarProducto( producto: Producto ): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}${this.endpoint}/${producto.id}`, JSON.stringify(producto), this.setOptions());
  }

  eliminarProducto( producto: Producto ): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiUrl}${this.endpoint}/${producto.id}`, this.setOptions());
  }

  obtenerCategoriaProducto( id: number ): Observable<Categoria> {
    return this.httpClient.get<Categoria>(`${environment.apiUrl}${environment.endpoints.categorias}/${id}`, this.setOptions());
  }

  obtenerListaProductos(): Observable<Resultado<Producto>> {
    return this.httpClient.get<Resultado<Producto>>(`${environment.apiUrl}${this.endpoint}?status=1`, this.setOptions());
  }

  getImage(producto: Producto): any{
    return this.httpClient.get<any>(producto.imagen);
  }

  cambiarStockProducto(idProducto: number, concepto: string, cantidad: number, precioUnitario: string): Observable<any> {
    const data = {
      id_producto: idProducto,
      tipo: concepto,
      cantidad,
      precio_unitario: precioUnitario
    };
    return this.httpClient.post<any>(`${environment.apiUrl}${environment.endpoints.cambiarStockProducto}`, data, this.setOptions());
  }

  resolve(route: ActivatedRouteSnapshot){
    const id =Number(route.paramMap.get('id'));
    return this.httpClient.get<Producto>(`${environment.apiUrl}index/${id}`, this.setOptions(undefined,false,false));
  }
}
