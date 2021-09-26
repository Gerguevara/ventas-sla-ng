import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LineaPlanilla } from '@models/linea.planilla.model';
import { Planilla } from '@models/planilla.model';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { PreflightService } from '@tools/services/preflight-service';


@Injectable({
  providedIn: 'root'
})
export class PlanillaService extends PreflightService{
  private url = `${environment.apiUrl}${environment.endpoints.planillas}`;
  private urlLineaPlanilla = `${environment.apiUrl}${environment.endpoints.lineasdeplanillas}`;

  constructor( private http: HttpClient ) {
    super()
  }

  mostrarPlanilla( planilla: Planilla ): Observable<LineaPlanilla[]> {
    return this.http.get<LineaPlanilla[]>(this.url + '/' + planilla.id, this.setOptions());
  }

  actualizarLineaPlanilla( lineadeplanilla: LineaPlanilla ): Observable<any> {
    return this.http.put<any> (this.urlLineaPlanilla + '/' + lineadeplanilla.id, JSON.stringify(lineadeplanilla), this.setOptions());
  }

  eliminarPlanilla( id: number ): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id, this.setOptions());
  }
}
