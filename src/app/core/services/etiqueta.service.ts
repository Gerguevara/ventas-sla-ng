import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RecursoService } from './recurso.service';
import { Etiqueta } from '@models/etiqueta.model';
import { Categoria } from '@models/categoria.model';
import { Resultado } from '@models/resultados/resultado.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService extends RecursoService<Etiqueta> {

  private API_URL_config = environment.apiUrl;

  constructor(protected httpClient: HttpClient) {
    super(environment.endpoints.etiquetas,httpClient);
  }

  getEtiquetas(page: number = 1, page_size?: number): {resultado:Observable<Resultado<Etiqueta>>,categorias:Observable<Resultado<Categoria>>} {
    let paramsReq = undefined;
    if(page_size)
      paramsReq = { page: page.toString(), page_size: page_size.toString()};
    else
      paramsReq = { page: page.toString()};
    let resultado : Observable<Resultado<Etiqueta>> = this.httpClient.get<Resultado<Etiqueta>>(`${this.API_URL_config}etiquetas`, this.setOptions(paramsReq));
    let categorias : Observable<Resultado<Categoria>> =this.httpClient.get<Resultado<Categoria>>(`${this.API_URL_config}categorias`, this.setOptions());
    return {
      resultado: resultado,
      categorias : categorias
    }
  }
}
