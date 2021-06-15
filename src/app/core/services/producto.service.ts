import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Etiqueta } from '../Models/etiqueta.model';
import { RecursoService } from './recurso.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService  extends RecursoService<Etiqueta>{

  constructor(protected httpClient: HttpClient) {
    super('productos',httpClient)
  }
}
