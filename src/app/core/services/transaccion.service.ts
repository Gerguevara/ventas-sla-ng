import { PreflightService } from '@tool-services/preflight-service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Transaccion } from '@models/transaccion.model';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService extends PreflightService {

  constructor(
    private httpClient: HttpClient,
  ) {
    super();
  }

  getKardex(id: number): Observable<Transaccion[]> {
    let params = Object.create(null);
    params['id_producto']=id;
    return this.httpClient.get<Transaccion[]>(
      `${environment.apiUrl}${environment.endpoints.kardex}`,
      this.setOptions(params));
  }
}
