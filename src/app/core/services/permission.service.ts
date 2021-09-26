import { PreflightService } from '@tool-services/preflight-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Permission } from '@models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends PreflightService{

  private API_URL = environment.apiUrl;

  constructor( private http: HttpClient ) {
    super();
  }

  getPermissionsUser(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}getPermissionsUser`, this.setOptions());
  }

  getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.API_URL}getAllPermissions/`, this.setOptions());
  }

  verifyPermission( permission: string ): Observable<any>{
    return this.http.get<string[]>(`${this.API_URL}verifyPermission/${permission}`, this.setOptions());
  }

}
