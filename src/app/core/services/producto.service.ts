import { Resultado } from './../Models/resultado.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from './../Models/categoria.model';
import { Producto } from './../Models/producto.model';
import { Etiqueta } from '../Models/etiqueta.model';
import { RecursoService } from './recurso.service';
import { environment } from 'src/environments/environment';

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
export class ProductoService  extends RecursoService<Etiqueta>{

  private endpoint : string = "productos/";
  private urlUploadServer : string = environment.uploadUrl;

  constructor(protected httpClient: HttpClient) {
    super('productos',httpClient)
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
  subirImagen( imagen : any ): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
        'Authorization': token
      })
    };
    let formData : FormData = new FormData();
    formData.append('uploaded_file', imagen);
    return this.httpClient.post<any>(this.urlUploadServer, formData);
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
        'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
        'Authorization': token
      })
    };
    return this.httpClient.post<any>(`${environment.apiUrl}${this.endpoint}`, producto, httpHeaders);
  }

  actualizarProducto( producto: Producto ): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
        'Authorization': token
      })
    };
    return this.httpClient.put<any>(`${environment.apiUrl}${this.endpoint}${producto.id}`, JSON.stringify(producto), httpHeaders);
  }

  eliminarProducto( producto: Producto ): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
        'Authorization': token
      })
    };
    return this.httpClient.delete<any>(`${environment.apiUrl}${this.endpoint}${producto.id}`, httpHeaders);
  }

  obtenerCategoriaProducto( id: number ): Observable<Categoria> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
        'Authorization': token
      })
    };
    return this.httpClient.get<Categoria>(`${environment.apiUrl}categorias/` + id, httpHeaders);
  }

  obtenerListaProductos(): Observable<Resultado<Producto>> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
        'Authorization': token
      })
    };
    //http://localhost:8000/api/productos?status=1
    return this.httpClient.get<Resultado<Producto>>(`${environment.apiUrl}${this.endpoint}?status=1`, options);
  }

  // Con esta funcion creamos un archivo a partir de una url del recurso
  async obtenerImagen( url: string ): Promise<File>{
    const response = await fetch(url,{
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }
      );
    const arreglo = url.split('/');
    const data = await response.blob();
    const metadata = {
      type: 'image/jpeg,image/png,image/jpg'
    };
    const file = new File([data], arreglo[arreglo.length - 1], metadata);
    return file;
  }
}
