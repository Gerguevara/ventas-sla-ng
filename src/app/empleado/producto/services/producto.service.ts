import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatorResponse } from '../../models/paginator.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor( private http: HttpClient ) {
    console.log('Running Product Service...');
  }

  getAllProducts( itemsPorPagina: number ): Observable<PaginatorResponse> {
    const urlProductos = 'http://localhost:8000/api/productos';
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': token
      })
    };
    return this.http.get<PaginatorResponse>( urlProductos + '?val=' + itemsPorPagina, httpHeaders);
  }
}
