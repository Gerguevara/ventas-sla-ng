import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { PreflightService } from '@tools/services/preflight-service';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Resultado } from '../Models/resultado.model';
import { Recurso } from './../Models/recurso.model';

export abstract class RecursoService<T extends Recurso> extends PreflightService {

  protected API_URL = environment.apiUrl;

  constructor(
    endpoint: string,
    protected httpClient: HttpClient
    ) {
      super();
      this.API_URL = this.API_URL.concat(`${endpoint}`)
    }

  getObjects(page: number = 1, page_size: number = 10, non_empty?: boolean): Observable<Resultado<T>> {
    const token = 'Bearer ' + localStorage.getItem('token');
    let params = Object.create(null);
    params['page']= page.toString();
    params['page_size']= page_size.toString();
    if(non_empty){
      params['non_empty']= non_empty;
    }
    return this.httpClient.get<Resultado<T>>(this.API_URL, {
      params: params,
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': environment.allowedOrigin,
        'Authorization': token
      })
    });
  }

  getObject(id: number): Observable<T> {
    const options = this.setOptions();
    return this.httpClient.get<T>(`${this.API_URL}/${id}`,options);
  }

  updateObject(resource: T): Observable<{resultado:boolean,mensaje:string}>  {
    const options = this.setOptions();
    return this.httpClient.put<{resultado:boolean,mensaje:string}>(`${this.API_URL}/${resource.id}`,resource, options);
  }

  postObject(resource: T): Observable<T> {
    const options = this.setOptions();
    return this.httpClient.post<T>(`${this.API_URL}`, resource, options);
  }

  deleteObject(id: number): Observable<HttpResponse<never>> {
    const token = 'Bearer ' + localStorage.getItem('token');
    return this.httpClient.delete<never>(
      `${this.API_URL}/${id}`,
      {
        observe: 'response',
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': environment.allowedOrigin,
          'Authorization': token
        })
      });
  }
}
