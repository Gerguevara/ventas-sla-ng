import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Orden } from '@models/orden.model';

const token = 'Bearer ' + localStorage.getItem('token');
const headers = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
    'Authorization': token
  })
};

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private url = `${environment.apiUrl}ordenes`;

  constructor( private http: HttpClient ) { }

  /**
   * @ngdoc method
   * @name filtrarVentas
   * @description
   * Realiza un GET a la url de odenes de la API enviando en el body del request
   * los datos del input y recibe los resultados de la filtración paginados. Estos
   * los retorna.
   * @param input
   * @returns Observable<any>
   */
  filtrarVentas( estado?: string, start?: string, end?: string ): Observable<any> {
    return this.http.get<any>(`${this.url}?page_size=5&estado=${estado}&start=${start}&end=${end}`, headers);
  }

  /**
   * @ngdoc method
   * @name obtenerVenta
   * @description
   * Realiza petición GET a la API enviando como paràmetro el ID de la orden que se
   * desea obtener, y retorna un observable con los datos.
   * @param orden:Orden
   * @returns Observable<any>
   */
  obtenerVenta(orden: Orden): Observable<Orden> {
    return this.http.get<Orden>(`${this.url}/${orden.id}`, headers);
  }
}
