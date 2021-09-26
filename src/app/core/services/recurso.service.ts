import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Resultado } from 'src/app/core/models/resultados/resultado.model';
import { Recurso } from 'src/app/core/models/recurso.model';
import { PreflightService } from '@tool-services/preflight-service';

export abstract class RecursoService<T extends Recurso> extends PreflightService {

  protected API_URL = environment.apiUrl;

  constructor(
    endpoint: string,
    protected httpClient: HttpClient
    ) {
      super();
      this.API_URL = this.API_URL.concat(`${endpoint}`)
    }

  getObjects(page: number = 1, page_size: number = 10, non_empty?: boolean, no_pagination?: boolean, search?: string): Observable<Resultado<T>> {
    let params = Object.create(null);
    if(non_empty){
      params['non_empty']= non_empty;
    }
    if(!no_pagination){
      params['page']= page.toString();
      params['page_size']= page_size.toString();
    }
    if(search){
      params['search']=search;
    }
    return this.httpClient.get<Resultado<T>>(this.API_URL,
      this.setOptions(params));
  }

  searchObject(search: string, page?: number, page_size?: number, non_empty?: boolean): Observable<Resultado<T>>{
    return this.getObjects(page, page_size, non_empty, false, search);
  }

  getNonEmptyObjects(page?: number, page_size?: number, no_pagination?: boolean, search?: string){
    return this.getObjects(page, page_size, true, no_pagination, search);
  }

  getNonPaginatedObjects(page?: number, page_size?: number, non_empty?: boolean, search?: string){
    return this.getObjects(page, page_size, non_empty, true, search);
  }

  getObject(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.API_URL}/${id}`, this.setOptions());
  }

  updateObject(resource: T): Observable<{resultado:boolean,mensaje:string}>  {
    const options = this.setOptions();
    return this.httpClient.patch<{resultado:boolean,mensaje:string}>(`${this.API_URL}/${resource.id}`,resource, options);
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
