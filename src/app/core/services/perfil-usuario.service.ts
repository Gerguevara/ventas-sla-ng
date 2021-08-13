import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PerfilUsuario } from '@core/models/perfil.usuario.model';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

const token = 'Bearer ' + localStorage.getItem('token');
const httpHeaders = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': token
  })
};

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService {

  private endpoint = 'perfiles/perfilUsuario';
  private url = `${environment.apiUrl}${this.endpoint}`;

  constructor( private http: HttpClient ) { }

  obtenerPerfilUsuario( id: number ): Observable<PerfilUsuario[]> {
    return this.http.get<PerfilUsuario[]>(this.url + '/' + id, httpHeaders);
  }

  actualizarPerfilUsuario( perfil: PerfilUsuario ): Observable<any> {
    return this.http.put<any>(this.url + '/' + localStorage.getItem('user_identity'), perfil, httpHeaders);
  }
}
