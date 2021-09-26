import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LineaPlanilla } from 'src/app/core/models/linea.planilla.model';
import { Planilla } from 'src/app/core/models/planilla.model';
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
  private url = `${environment.apiUrl}${environment.endpoints.planillas}`;
  private urlLineaPlanilla = `${environment.apiUrl}${environment.endpoints.lineasdeplanillas}`;

  constructor( private http: HttpClient ) { }

  mostrarPlanilla( planilla: Planilla ): Observable<LineaPlanilla[]> {
    return this.http.get<LineaPlanilla[]>(this.url + '/' + planilla.id, httpHeaders);
  }

  actualizarLineaPlanilla( lineadeplanilla: LineaPlanilla ): Observable<any> {
    return this.http.put<any> (this.urlLineaPlanilla + '/' + lineadeplanilla.id, JSON.stringify(lineadeplanilla), httpHeaders);
  }

  eliminarPlanilla( id: number ): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id, httpHeaders);
  }
}
