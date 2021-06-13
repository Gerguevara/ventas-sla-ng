import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

export interface LoginResponse {
  response: string;
  token: string;
  tokenType: string;
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
export class AutenticacionService {

  urlLogin = 'http://localhost:8000/api/login';
  urlSignUp = 'http://localhost:8000/api/register';
  urlEmailVerification = 'http://localhost:8000/api/verify-email/';

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

  submitRegistro( email: string, password: string, password_confirmation: string ): Observable<SignUpResponse> {
    const httpBody = {
      email,
      password,
      password_confirmation
    };
    return this.http.post<SignUpResponse>(this.urlSignUp, httpBody, httpOptions);
  }

  emailVerification( id: string, hash: string ): Observable<EmailVerificationResponse> {
    const token = localStorage.getItem('tokenRegistro');
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

}
