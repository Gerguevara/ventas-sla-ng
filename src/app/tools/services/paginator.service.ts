import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/* Esta interfaz contiene toda la estructura de datos de la respuesta recibida por el
   API de Productos Index */
export interface PaginatorResponse {
  current_page: number;
  data: any;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [{
    url: string;
    label: string;
    activate: boolean;
  }];
  next_page_url: string;
  path: string;
  per_page: string;
  prev_page_url: string;
  to: number;
  total: number;
}

const urlChangePage = 'http://localhost:8000/api/productos?page=';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  constructor( private http: HttpClient ) { }

  getDataChangePage( page: number ): Observable<PaginatorResponse> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': token
      })
    };
    return this.http.get<PaginatorResponse>(urlChangePage + page, httpOptions);
  }

}
