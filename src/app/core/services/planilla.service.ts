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
  private urlLineaPlanilla = `${environment.apiUrl}` + 'lineasdeplanillas';

  constructor( private http: HttpClient ) { }

  mostrarPlanilla( planilla: Planilla ): Observable<LineaPlanilla[]> {
    return this.http.get<LineaPlanilla[]>(this.url + '/' + planilla.id, httpHeaders);
  }

  actualizarLineaPlanilla( lineadeplanilla: LineaPlanilla ): Observable<any> {
    const body = {
      horas_extra_diurnas: lineadeplanilla.horas_extra_diurnas,
      horas_extra_nocturnas: lineadeplanilla.horas_extra_nocturnas,
      horas_extra_domingo: lineadeplanilla.horas_extra_domingo
    };
    return this.http.put<any> (this.urlLineaPlanilla + '/' + lineadeplanilla.id, JSON.stringify(lineadeplanilla), httpHeaders);
  }

  eliminarPlanilla( id: number ): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id, httpHeaders);
  }
}
