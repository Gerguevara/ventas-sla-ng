import { HttpClient } from '@angular/common/http';
import { Etiqueta } from './../Models/etiqueta.model';
import { Injectable } from '@angular/core';
import { RecursoService } from './recurso.service';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService extends RecursoService<Etiqueta> {

  constructor(protected httpClient: HttpClient) { 
    super('etiquetas',httpClient);
  }
}
