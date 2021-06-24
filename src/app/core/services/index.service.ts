import { Producto } from '../Models/producto.model';
import { Injectable } from '@angular/core';
import { RecursoService } from './recurso.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IndexService extends RecursoService<Producto> {

  constructor(protected httpClient: HttpClient) { 
    super('index', httpClient);
  }
}
