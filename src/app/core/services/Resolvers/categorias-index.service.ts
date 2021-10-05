import { IndexService } from './../index.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Categoria } from '@models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasIndexService implements Resolve<Categoria[]>{

  constructor(
    private indexService: IndexService
  ) { }

  resolve(): Observable<Categoria[]>{
    return this.indexService.obtenerCategorias();
  }
}
