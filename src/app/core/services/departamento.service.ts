import { Injectable } from '@angular/core';
import { RecursoService } from './recurso.service';
import { HttpClient } from '@angular/common/http';
import { Departamento } from '@models/departamento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService extends RecursoService<Departamento> {

  constructor(protected httpClient: HttpClient) {
    super('departamentos', httpClient);
  }
}
