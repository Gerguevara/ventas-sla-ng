import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Categoria } from '@models/categoria.model';
import { RecursoService } from './recurso.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends RecursoService<Categoria> {

  constructor(protected httpClient: HttpClient) {
    super(environment.endpoints.categorias, httpClient);
  }

  buscarCategoria(search?: string, non_empty?: boolean): Observable<Categoria[]> {
    const token = 'Bearer ' + localStorage.getItem('token');
    let params = Object.create(null);
    if(search){
      params['search']= search;
    } else {
      params['search']= '';
    }
    if(non_empty){
      params['non_empty']= non_empty;
    }
    return this.httpClient.get<Categoria[]>(this.API_URL, this.setOptions(params));
  }
}
