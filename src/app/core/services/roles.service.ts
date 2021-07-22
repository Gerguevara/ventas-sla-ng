import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Resultado } from '../Models/resultado.model';
import { Rol } from '../Models/rol.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Permission } from '../Models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private endpoint = 'roles';

  constructor( private http: HttpClient ) { }

  async getDepartamento( id: number ): Promise<Resultado<any>> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
        'Authorization': token
      })
    };
    const response = await this.http.get<Resultado<any>>(`${environment.apiUrl}` + 'departamentos/' + id, headers).toPromise();
    return response;
  }

  getPermisos( idRole: number ): Observable<Permission[]> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
        'Authorization': token
      })
    };
    return this.http.get<Permission[]>(`${environment.apiUrl}` + 'roles/' + idRole, headers).pipe(map(
      ( data: any ) => {
        return data.permisos;
      }
    ));
  }

  actualizarRol( rol: Rol ): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
        'Authorization': token
      })
    };
    return this.http.post<any>(`${environment.apiUrl}${this.endpoint}`, rol, httpHeaders);
  }

}
