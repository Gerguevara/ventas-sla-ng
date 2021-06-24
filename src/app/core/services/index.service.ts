import { environment } from './../../../environments/environment';
import { Producto } from '../Models/producto.model';
import { Injectable } from '@angular/core';
import { RecursoService } from './recurso.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
