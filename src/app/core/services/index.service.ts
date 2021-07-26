import { environment } from './../../../environments/environment';
import { Producto } from '../Models/producto.model';
import { Injectable } from '@angular/core';
import { RecursoService } from './recurso.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../Models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class IndexService extends RecursoService<Producto> {

  constructor(protected httpClient: HttpClient) {
    super('index', httpClient);
  }

  getObject(id: number): Observable<Producto> {
    const options = this.setOptions();
    return this.httpClient.get<Producto>(`${environment.apiUrl}index/${id}`,options);
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
}
