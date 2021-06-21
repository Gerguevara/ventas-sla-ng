import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaginatorResponse } from 'src/app/empleado/models/paginator.model';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  constructor( private http: HttpClient ) { }

  /* Los métodos async esperan hasta que la respuesta del servidor esté lista y devuelven una promesa
     la cual debe ser recibida en el componente. Esto nos permite asegurar la respuesta para que los datos
     no queden como Undefined */
     // Este método devuelve toda la data inicial de la tabla
  async getAllData( urlData: string, itemsPorPagina: number, params: string ): Promise<PaginatorResponse> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': token
      })
    };
    const response = await this.http.get<PaginatorResponse>( urlData + '?val=' + itemsPorPagina + params, httpHeaders).toPromise();
    return response;
  }

  async getPageData( urlData: string, itemsPorPagina: number, params: string ): Promise<PaginatorResponse> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': token
      })
    };
    const response = await this.http.get<PaginatorResponse>( urlData + '&val=' + itemsPorPagina + params, httpHeaders).toPromise();
    return response;
  }

}
