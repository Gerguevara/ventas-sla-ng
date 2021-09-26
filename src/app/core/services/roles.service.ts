import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { RecursoService } from './recurso.service';
import { Permission } from 'src/app/core/models/permission.model';
import { Departamento } from 'src/app/core/models/departamento.model';
import { Resultado } from 'src/app/core/models/resultados/resultado.model';
import { environment } from '@environments/environment';
import { Rol } from 'src/app/core/models/rol.model';
import { PermissionsByPanel } from '@tool-models/PermissionsByPanel';

@Injectable({
  providedIn: 'root'
})
export class RolesService extends RecursoService<Rol> {

  private endpoint = environment.endpoints.roles;

  constructor( private http: HttpClient ) {
    super(environment.endpoints.roles,http);
  }

  getDepartamento( id: number ): Observable<Resultado<any>> {
    return this.http.get<Resultado<any>>(`${environment.apiUrl}departamentos/${id}`, this.setOptions());
  }

  getDepartamentos(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${environment.apiUrl}departamentos/`, this.setOptions());
  }

  searchDepartamento( nombre: string ): Observable<Departamento[]> {
    return this.http.post<Departamento[]>(`${environment.apiUrl}departamentos/search`, {consulta: nombre} ,this.setOptions()).pipe(
      debounceTime(300),
    );
  }

  getPanels(): Observable<PermissionsByPanel[]> {
    return this.http.get<PermissionsByPanel[]>(`${environment.apiUrl}panels/`, this.setOptions());
  }

  getPermisos( idRole: number ): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${environment.apiUrl}roles/${idRole}`, this.setOptions()).pipe(map(
      ( data: any ) => {
        return data.permisos;
      }
    ));
  }

  crearRol( rol: Rol ): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}${this.endpoint}`, rol, this.setOptions());
  }

  actualizarRol( rol: Rol, id: number ): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}${this.endpoint}/${id}`, rol, this.setOptions());
  }

  deleteRol( id: number ): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}${this.endpoint}/${id}`, this.setOptions());
  }

}
