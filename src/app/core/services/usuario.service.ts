import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/core/models/usuario.model';
import { environment } from '@environments/environment';
import { RecursoService } from './recurso.service';
import { Observable } from 'rxjs';
import { EmailVerificationResponse } from '@tool-models/EmailVerificationResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends RecursoService<Usuario>{
  urlEmailVerification = `${environment.apiUrl}${environment.endpoints.changeMail}`;

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(environment.endpoints.usuarios, httpClient);
  }

  patchUser(resource: any): Observable<{resultado:boolean,mensaje:string}>  {
    return this.httpClient.patch<{resultado:boolean,mensaje:string}>(this.API_URL,resource, this.setOptions(resource));
  }

  confirmEmailChange( id: string, hash: string ): Observable<string> {
    return this.httpClient.get<string>(`${this.urlEmailVerification}/${id}/${hash}`, this.setOptions(undefined,true,true));
  }

  changePassword(oldPassword: string, newPassword: string, confirmation: string): Observable<string>{
    const data=
    {
      currentPassword: oldPassword,
      newPassword: newPassword,
      newPassword_confirmation: confirmation
    };
    return this.httpClient.post<string>(
      `${environment.apiUrl}${environment.endpoints.changePassword}`,
      data,
      this.setOptions(),
    );
  }
}
