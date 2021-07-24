import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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

  async getAllPermissions(): Promise<any> {
    const resp = await this.http.get<string[]>(this.API_URL + 'getAllPermissions', httpHeaders).pipe(
      map(
        (response: any) => {
          const list: string[] = [];
          for (const item of response[0]) {
            list.push(item.name);
          }
          return list;
        }
      )).toPromise();
    return resp;
  }

  verifyPermission( permission: string ): Observable<any>{
    return this.http.get<string[]>(this.API_URL + 'verifyPermission/' + permission, httpHeaders);
  }

}
