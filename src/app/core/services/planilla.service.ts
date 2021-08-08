import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LineaPlanilla } from '@core/Models/linea.planilla.model';
import { Planilla } from '@core/Models/planilla.model';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

const token = 'Bearer ' + localStorage.getItem('token');
const httpHeaders = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': token
  })
};

@Injectable({
  providedIn: 'root'
})
export class PlanillaService {

  private endpoint = 'planillas';
  private url = `${environment.apiUrl}${this.endpoint}`;

  constructor( private http: HttpClient ) { }

  mostrarPlanilla( planilla: Planilla ): Observable<LineaPlanilla[]> {
    return this.http.get<LineaPlanilla[]>(this.url + '/' + planilla, httpHeaders);
  }

  eliminarPlanilla( id: number ): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id, httpHeaders);
  }
}
