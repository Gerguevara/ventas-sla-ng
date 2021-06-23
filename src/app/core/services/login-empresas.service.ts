import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

export interface LoginResponse {
  token?: string;
  tokenType?: string;
  mensaje: string;
}

export interface SignUpResponse {
  usuario_empresa: string;
  user: string;
  token: string;
  token_type: string;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginEmpresasService {

  urlLogin = `${environment.apiUrl}` + 'loginEmpresa';
  urlSignUp = `${environment.apiUrl}` + 'registrarEmpresa';

  constructor( protected http: HttpClient ) {
    console.log('Running login enterprise service...');
  }

  submitLogin( email: string, password: string ): Observable<LoginResponse> {
    const httpBody = {
      email,
      password
    };
    return this.http.post<LoginResponse>(this.urlLogin, httpBody, httpOptions);
  }

  submitRegistro( email: string, password: string, password_confirmation: string ): Observable<SignUpResponse> {
    const httpBody = {
      email,
      password,
      password_confirmation
    };
    return this.http.post<SignUpResponse>(this.urlSignUp, httpBody, httpOptions);
  }

}
