import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Resultado } from '../Models/resultado.model';
import { Recurso } from './../Models/recurso.model';

export abstract class RecursoService<T extends Recurso> {

  private origin = `${environment.allowedOrigin}`;
  private API_URL = `${environment.apiUrl}`;

  constructor(
    endpoint: string,
    protected httpClient: HttpClient
    ) {
    this.API_URL = this.API_URL.concat(`${endpoint}/`)
  }

  setOptions() {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': this.origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Authorization': token
      })
    };
    return httpOptions
  }

  getObjects(page: number = 1, page_size: number = 10): Observable<Resultado<T>> {
    const token = 'Bearer ' + localStorage.getItem('token');
    return this.httpClient.get<Resultado<T>>(this.API_URL, {
      params: { page: page.toString(), page_size: page_size.toString()},
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': this.origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Authorization': token
      })
    });
  }

  getObject(id: number): Observable<T> {
    const options = this.setOptions();
    return this.httpClient.get<T>(`${this.API_URL}${id}`,options);
  }

  updateObject(resource: T): Observable<T> {
    const options = this.setOptions();
    return this.httpClient.put<T>(`${this.API_URL}${resource.id}/`,resource, options);
  }

  postObject(resource: T): Observable<T> {
    const options = this.setOptions();
    return this.httpClient.post<T>(`${this.API_URL}`, resource, options);
  }

  deleteObject(id: number): Observable<HttpResponse<never>> {
    const token = 'Bearer ' + localStorage.getItem('token');
    return this.httpClient.delete<never>(
      `${this.API_URL}${id}`,
      {
        observe: 'response',
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': this.origin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Authorization': token
        })
      });
  }
}
