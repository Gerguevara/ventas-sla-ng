import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empresa } from '../Models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesEmpresaService {

  urlSolicitudes = `${environment.apiUrl}` + 'usuarioEmpresas';
  urlCambiarEstadoSolicitudes = `${environment.apiUrl}` + 'usuarioEmpresas/';

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
    return this.http.patch<any>(this.urlCambiarEstadoSolicitudes + id, httpBody, httpHeaders);
  }

}
