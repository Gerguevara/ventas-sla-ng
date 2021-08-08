import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  mostrarPlanilla( id: number ): Observable<Planilla> {
    return this.http.get<Planilla>(this.url + '/' + id, httpHeaders);
  }

  eliminarPlanilla( id: number ): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id, httpHeaders);
  }
}
