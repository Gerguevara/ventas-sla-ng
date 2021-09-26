import { Injectable } from '@angular/core';
import { RecursoService } from './recurso.service';
import { HttpClient } from '@angular/common/http';
import { Departamento } from '@models/departamento.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService extends RecursoService<Departamento> {

  constructor(protected httpClient: HttpClient) {
    super(environment.endpoints.departamentos, httpClient);
  }
}
