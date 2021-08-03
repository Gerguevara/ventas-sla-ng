import { Permission } from './../models/permission.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
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
export class PermissionService {

  private API_URL = `${environment.apiUrl}`;

  constructor( private http: HttpClient ) { }

  getAllPermissions(): Observable<string[]> {
    const response = this.http.get<{ [key:number] : Permission[] }>(this.API_URL + 'getAllPermissions', httpHeaders).pipe(
      map( //{ [key:number] : Permission[] } por ahora lo he dejado asi, considera hacer un modelo de esto, resultado-permission o algo asi, como en la carpeta resultados
        (response: { [key:number] : Permission[] }) => response[0]
      ),
      map(
        (array: Permission[]) => array.map(({ name }) => name)
      )
      );
    return response;
  }

  verifyPermission( permission: string ): Observable<any>{
    return this.http.get<string[]>(this.API_URL + 'verifyPermission/' + permission, httpHeaders);
  }

}
