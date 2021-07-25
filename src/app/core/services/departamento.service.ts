import { Injectable } from '@angular/core';
import { RecursoService } from './recurso.service';
import { HttpClient } from '@angular/common/http';
import { Departamento } from '../Models/departamento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService extends RecursoService<Departamento> {

  constructor(protected httpClient: HttpClient) {
    super('departamentos', httpClient);
  }

  updateDepartamento(resource: Departamento): Observable<{resultado:boolean,mensaje:string}> {
    const options = this.setOptions();
    return this.httpClient.put<{resultado:boolean,mensaje:string}>(`${this.API_URL}/${resource.id}`,resource, options);
  }
}
