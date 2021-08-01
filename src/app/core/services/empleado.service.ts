import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Empleado } from '@models/empleado.model';
import { PreflightService } from '@tools/services/preflight-service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService extends PreflightService{
  API_URL = environment.apiUrl;
  endpoint = 'empleados';

  constructor(
    private httpClient: HttpClient
    ) {
      super();
      this.API_URL = this.API_URL.concat(`${this.endpoint}`)
  }

  postEmpleado(empleado: Empleado): Observable<Empleado> {
    const options = this.setOptions();
    return this.httpClient.post<Empleado>(`${this.API_URL}`, empleado, options);
  }
}
