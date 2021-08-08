import { PerfilUsuario } from './../models/perfil.usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PerfilEmpleado } from '@models/perfil.empleado.model';
import { environment } from '@environments/environment';
import { RecursoService } from './recurso.service';
import { ResultadoEmpleado } from '@core/models/resultados/resultado-empleado.model';
import { map, debounceTime } from 'rxjs/operators';
import { Resultado } from '@core/models/resultados/resultado.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService extends RecursoService<PerfilEmpleado>{
  API_URL = environment.apiUrl;
  endpoint = environment.endpoints.empleados;

  constructor(
    protected httpClient: HttpClient
    ) {
      super(environment.endpoints.empleados,httpClient);
      this.API_URL = this.API_URL.concat(`${this.endpoint}`)
  }

  getEmpleado(id: number): Observable<PerfilEmpleado> {
    const options = this.setOptions();
    return this.httpClient.get<ResultadoEmpleado>(`${this.API_URL}/${id}`,options).pipe(
      map(
        (resultado: ResultadoEmpleado)=>{
          const empleadoId = resultado.perfilempleado.id;
          Object.assign(resultado.perfilempleado, resultado.usuario);
          Object.assign(resultado.perfilempleado, resultado.perfilusuario);
          resultado.perfilempleado.id = empleadoId;
          return resultado.perfilempleado;
        }
      )
    )
  }

  getEmpleados(page: number = 1, page_size: number = 10, no_pagination?: boolean, search?: string, roleId?: number){
    const token = 'Bearer ' + localStorage.getItem('token');
    let params = Object.create(null);
    if(!no_pagination){
      params['page']= page.toString();
      params['page_size']= page_size.toString();
    }
    if(search){
      params['search']=search;
    }
    if(roleId){
      params['role']=roleId;
    }
    return this.httpClient.get<Resultado<PerfilEmpleado>>(this.API_URL, {
      params: params,
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': environment.allowedOrigin,
        'Authorization': token
      })
    });  }

  searchEmpleados(search: string, page?: number, page_size?: number, roleId?: number){
    return this.getEmpleados(page, page_size, false, search, roleId).pipe(
      debounceTime(350)
    );
  }

  getEmpleadosByRole(roleId: number, search?: string, page?: number, page_size?: number, no_pagination?: boolean, ){
    return this.getEmpleados(page,page_size,no_pagination,search,roleId).pipe(
      debounceTime(350)
    );
  }

  postEmpleado(empleado: PerfilEmpleado): Observable<PerfilEmpleado> {
    const options = this.setOptions();
    return this.httpClient.post<PerfilEmpleado>(`${this.API_URL}`, empleado, options);
  }
}
