import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Permission } from '@core/models/permission.model';

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

  getPermissionsUser(): Observable<string[]> {
    const response = this.http.get<{ [key:number] : Permission[] }>(this.API_URL + 'getPermissionsUser', httpHeaders).pipe(
      map( //{ [key:number] : Permission[] } por ahora lo he dejado asi, considera hacer un modelo de esto, resultado-permission o algo asi, como en la carpeta resultados
        (response: { [key:number] : Permission[] }) => response[0]
      ),
      map(
        (array: Permission[]) => array.map(({ name }) => name)
      )
      );
    return response;
  }

  getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.API_URL + 'getAllPermissions/', httpHeaders);
  }

  verifyPermission( permission: string ): Observable<any>{
    return this.http.get<string[]>(this.API_URL + 'verifyPermission/' + permission, httpHeaders);
  }

}
