import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Orden } from '@models/orden.model';
import { RecursoService } from './recurso.service';

@Injectable({
  providedIn: 'root'
})
export class VentasService extends RecursoService<Orden> {

  private url = `${environment.apiUrl}${environment.endpoints.ordenes}`;

  constructor( private http: HttpClient ) {
    super(environment.endpoints.ordenes, http);
  }

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
    return this.http.get<any>(`${this.url}?page_size=5&estado=${estado}&start=${start}&end=${end}`, this.setOptions());
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
    return this.http.get<Orden>(`${this.url}/${orden.id}`, this.setOptions());
  }

  /**
   * @ngdoc method
   * @name actualizarEstadoOrden
   * @description
   * Actualiza el estado de la orden hacia la API a través de patch, enviando como parámetros, de ser necesario,
   * el neuvo estado, la direccion y la fecha de entrega si el estado cambia a En Curso (E)
   * @param estado
   * @param direccion
   * @param fecha
   * @returns Obervable<Orden>
   */
  actualizarEstadoOrden(ordenId: number, estado: string, direccion?: string, fecha?: string): Observable<Orden> {
    if ( estado === 'E' ) {
      return this.http.patch<Orden>(`${this.url}/${ordenId}`, { estado: estado, direccion: direccion, entrega: fecha }, this.setOptions());
    } else {
      return this.http.patch<Orden>(`${this.url}/${ordenId}`, { estado: estado }, this.setOptions());
    }
  }

  /**
   * @ngdoc method
   * @name obtenerMasVendidos
   * @description
   * Realiza petición get a API enviando la cantidad de productos más vendidos que se desean obtener
   * junto con la fecha que se quiere evaluar.
   */
  obtenerMasVendidos(cantidad: number, fecha?: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}${environment.endpoints.productosVendidos}`, {cantidad, fecha}, this.setOptions());
  }

  obtenerReportePdf(cantidad: number, fecha?: string): Observable<any> {
    /* return this.http.post<any>(`${environment.apiUrl}${environment.endpoints.productosVendidosPdf}`,
                                { cantidad, fecha }, this.setOptions());*/
                                const token = 'Bearer ' + localStorage.getItem('token');
                                const headers = new HttpHeaders({
                                  'Content-Type':  'application/json',
                                  'Access-Control-Allow-Origin': `${environment.allowedOrigin}`,
                                  'Authorization': token,
                                  'Accept': 'application/pdf' });
                                return this.http.post<any>(`${environment.apiUrl}${environment.endpoints.productosVendidosPdf}`,
                                { cantidad, fecha }, { headers, responseType: 'blob' as 'json' } );
  }
}
