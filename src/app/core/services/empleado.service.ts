import { Empleado } from '@models/empleado.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PreflightService } from '@tools/services/preflight-service';

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
