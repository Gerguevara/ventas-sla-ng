import { PreflightService } from '@tool-services/preflight-service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Empresa } from '@models/empresa.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesEmpresaService extends PreflightService{

  urlSolicitudes = `${environment.apiUrl}${environment.endpoints.usuarioEmpresas}`;

  constructor( private http: HttpClient ) {
    super();
  }

  getData(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.urlSolicitudes, this.setOptions());
  }

  updateEstadoSolicitud( id: number, estado: string ): Observable<any> {
    const httpBody = {
      estadoCuenta: estado
    };
    return this.http.patch<any>(`${this.urlSolicitudes}/id`, httpBody, this.setOptions());
  }

}
