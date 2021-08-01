import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from '@models/usuario.model';
import { environment } from '@environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

export interface LoginResponse {
  response: string;
  rol: string;
  token: string;
  tokenType: string;
  user: Usuario;
}

export interface SignUpResponse {
  user: string;
  token: string;
  tokenType: string;
  mensaje: string;
}

export interface EmailVerificationResponse {
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginClienteService {

  urlLogin = `${environment.apiUrl}` + 'login';
  urlLogout = `${environment.apiUrl}` + 'logout';
  urlSignUp = `${environment.apiUrl}` + 'register';
  urlEmailVerification = `${environment.apiUrl}` + 'verifyEmail/';
  urlForgotPass = `${environment.apiUrl}` + 'forgotPassword';
  urlResetPass = `${environment.apiUrl}` + 'resetPassword';
  urlTokenVerify = `${environment.apiUrl}` + 'tokenVerify';

  constructor( private http: HttpClient ) {
    console.log('Running Autentication Service...');
  }

  submitLogin( email: string, password: string ): Observable<LoginResponse> {
    const httpBody = {
      email,
      password
    };
    return this.http.post<LoginResponse>(this.urlLogin, httpBody, httpOptions);
  }

  submitLogout(): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': token
      })
    };
    return this.http.post<any>(this.urlLogout, {}, httpHeaders);
  }

  submitRegistro( email: string, password: string, password_confirmation: string ): Observable<SignUpResponse> {
    const httpBody = {
      email,
      password,
      password_confirmation
    };
    return this.http.post<SignUpResponse>(this.urlSignUp, httpBody, httpOptions);
  }

  submitForgot( email: string ): Observable<any> {
    const httpBody = {
      email
    };
    return this.http.post<any>(this.urlForgotPass, httpBody, httpOptions);
  }

  submitResetPassword( token: string, password: string, password_confirmation: string ): Observable<any> {
    const httpBody = {
      token: token,
      email: localStorage.getItem('email'),
      password: password,
      password_confirmation: password_confirmation
    };
    console.log(httpBody);
    return this.http.post<any>(this.urlResetPass, httpBody, httpOptions);
  }

  emailVerification( id: string, hash: string ): Observable<EmailVerificationResponse> {
    const token = localStorage.getItem('token-registro');
    const tokenRegistro = 'Bearer ' + token;
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': tokenRegistro
      })
    };
    const url = this.urlEmailVerification + id + '/' + hash;
    return this.http.get<EmailVerificationResponse>(url, httpHeaders);
  }

  async verificarToken(): Promise<any> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': token
      })
    };
    const response = await this.http.get<any>(this.urlTokenVerify, httpHeaders).toPromise();
    return response;
  }

}
