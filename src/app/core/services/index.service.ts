import { Categoria } from 'src/app/core/models/categoria.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RecursoService } from './recurso.service';
import { Producto } from 'src/app/core/models/producto.model';
import { ResultadoIndex } from 'src/app/core/models/resultados/resultado-index.model';
import { environment } from '@environments/environment';
import { HttpOptions } from '@tools/models/HttpOptions';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IndexService extends RecursoService<Producto> implements Resolve<ResultadoIndex[]> {

  constructor(protected httpClient: HttpClient) {
    super(environment.endpoints.index, httpClient);
  }

  obtenerCategoria( id: number ): Observable<ResultadoIndex> {
    return this.httpClient.get<ResultadoIndex>(`${environment.apiUrl}index/categoria/` + id, this.setOptions());
  }
  obtenerCategorias(): Observable<Categoria[]>{
    return this.httpClient.get<Categoria[]>(`${environment.apiUrl}index`, this.setOptions({'solo_categorias': 'true'}));
  }
  obtenerProductos(pageSize?: number | undefined): Observable<ResultadoIndex[]> {
    let options: HttpOptions;
    if(pageSize){
      options= this.setOptions({
        'page_size': pageSize,
      });
    } else {
      options = this.setOptions();
    }
    return this.httpClient.get<ResultadoIndex[]>(`${environment.apiUrl}index`, options);
  }

  resolve(){
    return this.obtenerProductos();
  }
}
