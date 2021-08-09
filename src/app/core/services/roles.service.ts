import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RecursoService } from './recurso.service';
import { Permission } from '@models/permission.model';
import { Departamento } from '@models/departamento.model';
import { Resultado } from '@models/resultados/resultado.model';
import { environment } from '@environments/environment';
import { Rol } from '@models/rol.model';
import { Panel } from '@models/panel.model';

export interface PermissionsByPanel {
  panel: Panel;
  permisos: Permission[];
}

@Injectable({
  providedIn: 'root'
})
export class RolesService extends RecursoService<Rol> {

  private endpoint = environment.endpoints.roles;

  constructor( private http: HttpClient ) {
    super(environment.endpoints.roles,http);
  }

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

  getDepartamentos(): Observable<Permission[]> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
        'Authorization': token
      })
    };
    return this.http.get<Permission[]>(`${environment.apiUrl}` + 'departamentos/', headers);
  }

  searchDepartamento( nombre: string ): Observable<Departamento[]> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
        'Authorization': token
      })
    };
    return this.http.get<Departamento[]>(`${environment.apiUrl}` + 'departamentos/search?consulta=' + nombre, headers);
  }

  getPanels(): Observable<PermissionsByPanel[]> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
        'Authorization': token
      })
    };
    return this.http.get<PermissionsByPanel[]>(`${environment.apiUrl}` + 'panels/', headers);
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

  crearRol( rol: Rol ): Observable<any> {
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

  actualizarRol( rol: Rol, id: number ): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
        'Authorization': token
      })
    };
    return this.http.put<any>(`${environment.apiUrl}${this.endpoint}` + '/' + id, rol, httpHeaders);
  }

  deleteRol( id: number ): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
        'Authorization': token
      })
    };
    return this.http.delete<any>(`${environment.apiUrl}${this.endpoint}/${id}`, httpHeaders);
  }

}
