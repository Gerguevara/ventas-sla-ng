import { PerfilUsuario } from './../models/perfil.usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PerfilEmpleado } from '@models/perfil.empleado.model';
import { environment } from '@environments/environment';
import { RecursoService } from './recurso.service';
import { ResultadoEmpleado } from '@core/models/resultados/resultado-empleado.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService extends RecursoService<PerfilEmpleado>{
  API_URL = environment.apiUrl;
  endpoint = 'empleados';

  constructor(
    protected httpClient: HttpClient
    ) {
      super('empleados',httpClient);
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

  postEmpleado(empleado: PerfilEmpleado): Observable<PerfilEmpleado> {
    const options = this.setOptions();
    return this.httpClient.post<PerfilEmpleado>(`${this.API_URL}`, empleado, options);
  }
}
