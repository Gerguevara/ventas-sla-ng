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

  async getAllPermissions(): Promise<string[]> {
    const resp = await this.http.get<{ [key:number] : Permission[] }>(this.API_URL + 'getAllPermissions', httpHeaders).pipe(
      map( //{ [key:number] : Permission[] } por ahora lo he dejado asi, considera hacer un modelo de esto, resultado-permission o algo asi, como en la carpeta resultados
        (response: { [key:number] : Permission[] }) => response[0],
      ),
      map(
        (array: Permission[]) => {
          let namesArray: string[]= [];
          array.forEach((permission: Permission)=>{
            namesArray.push(permission.name);
          })
          return namesArray;
        }
      )
      ).toPromise();
    return resp;
  }

  verifyPermission( permission: string ): Observable<any>{
    return this.http.get<string[]>(this.API_URL + 'verifyPermission/' + permission, httpHeaders);
  }

}
