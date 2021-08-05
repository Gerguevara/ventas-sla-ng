import { Categoria } from './../models/categoria.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RecursoService } from './recurso.service';
import { Producto } from '@models/producto.model';
import { ResultadoIndex } from '@models/resultados/resultado-index.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndexService extends RecursoService<Producto> {

  constructor(protected httpClient: HttpClient) {
    super(environment.endpoints.index, httpClient);
  }

  obtenerCategoria( id: number ): Observable<ResultadoIndex> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
        'Authorization': token
      })
    };
    return this.httpClient.get<ResultadoIndex>(`${environment.apiUrl}index/categoria/` + id, httpHeaders);
  }
  obtenerCategorias(): Observable<Categoria[]>{
    const token = 'Bearer ' + localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
        'Authorization': token
      }),
      params: {
        'solo_categorias': 'true',
      }
    };
    return this.httpClient.get<Categoria[]>(`${environment.apiUrl}index`, options);
  }
  obtenerProductos(): Observable<ResultadoIndex[]> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
        'Authorization': token
      })
    };
    return this.httpClient.get<ResultadoIndex[]>(`${environment.apiUrl}index`, httpHeaders);
  }
}
