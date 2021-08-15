import { Categoria } from '@models/categoria.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RecursoService } from './recurso.service';
import { Producto } from '@models/producto.model';
import { ResultadoIndex } from '@models/resultados/resultado-index.model';
import { environment } from '@environments/environment';
import { HttpOptions } from '@tools/models/HttpOptions';

@Injectable({
  providedIn: 'root'
})
export class IndexService extends RecursoService<Producto> {

  constructor(protected httpClient: HttpClient) {
    super(environment.endpoints.index, httpClient);
  }

  obtenerCategoria( id: number ): Observable<ResultadoIndex> {
    return this.httpClient.get<ResultadoIndex>(`${environment.apiUrl}index/categoria/` + id, this.setOptions());
  }
  obtenerCategorias(): Observable<Categoria[]>{
    return this.httpClient.get<Categoria[]>(`${environment.apiUrl}index`, this.setOptions(true,false,{'solo_categorias': 'true'}));
  }
  obtenerProductos(pageSize?: number | undefined): Observable<ResultadoIndex[]> {
    let options: HttpOptions;
    if(pageSize){
      options= this.setOptions(true,false,{
        'page_size': pageSize,
      });
    } else {
      options = this.setOptions();
    }
    return this.httpClient.get<ResultadoIndex[]>(`${environment.apiUrl}index`, options);
  }
}
