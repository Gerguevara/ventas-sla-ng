import { Categoria } from './../Models/categoria.model';
import { Injectable } from '@angular/core';
import { RecursoService } from './recurso.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends RecursoService<Categoria> {

  constructor(protected httpClient: HttpClient) { 
    super('categorias', httpClient);
  }
}
