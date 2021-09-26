import { PreflightService } from '@tool-services/preflight-service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Transaccion } from '@models/transaccion.model';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService extends PreflightService  implements Resolve<Transaccion[]>{

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

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Transaccion[]>{
    const id = Number(route.paramMap.get('id'))
    return this.getKardex(id);
  }
}
