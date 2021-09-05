import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Empresa } from '@models/empresa.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesEmpresaService {

  urlSolicitudes = `${environment.apiUrl}${environment.endpoints.usuarioEmpresas}`;

  constructor( private http: HttpClient ) { }

  getData(): Observable<Empresa[]> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
        'Authorization': token
      })
    };
    return this.http.get<Empresa[]>(this.urlSolicitudes, httpHeaders);
  }

  updateEstadoSolicitud( id: number, estado: string ): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
        'Authorization': token
      })
    };
    const httpBody = {
      estadoCuenta: estado
    };
    return this.http.patch<any>(`${this.urlSolicitudes}/id`, httpBody, httpHeaders);
  }

}
