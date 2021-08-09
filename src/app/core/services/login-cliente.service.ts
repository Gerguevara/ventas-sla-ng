import { PreflightService } from '@tool-services/preflight-service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from '@models/usuario.model';
import { environment } from '@environments/environment';

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
export class LoginClienteService extends PreflightService{

  urlLogin = `${environment.apiUrl}` + 'login';
  urlLogout = `${environment.apiUrl}` + 'logout';
  urlSignUp = `${environment.apiUrl}` + 'register';
  urlEmailVerification = `${environment.apiUrl}` + 'verifyEmail/';
  urlForgotPass = `${environment.apiUrl}` + 'forgotPassword';
  urlResetPass = `${environment.apiUrl}` + 'resetPassword';
  urlTokenVerify = `${environment.apiUrl}` + 'tokenVerify';

  constructor(private http: HttpClient ) {
    super();
   }

  submitLogin( email: string, password: string ): Observable<LoginResponse> {
    const httpBody = {
      email,
      password
    };
    return this.http.post<LoginResponse>(this.urlLogin, httpBody, this.setOptions(false));
  }

  submitLogout(): Observable<any> {
    return this.http.post<any>(this.urlLogout, {}, this.setOptions());
  }

  submitRegistro( email: string, password: string, password_confirmation: string ): Observable<SignUpResponse> {
    const httpBody = {
      email,
      password,
      password_confirmation
    };
    return this.http.post<SignUpResponse>(this.urlSignUp, httpBody, this.setOptions(false));
  }

  submitForgot( email: string ): Observable<any> {
    const httpBody = {
      email
    };
    return this.http.post<any>(this.urlForgotPass, httpBody, this.setOptions(false));
  }

  submitResetPassword( token: string, password: string, password_confirmation: string ): Observable<any> {
    const httpBody = {
      token: token,
      email: localStorage.getItem('email'),
      password: password,
      password_confirmation: password_confirmation
    };
    console.log(httpBody);
    return this.http.post<any>(this.urlResetPass, httpBody, this.setOptions(false));
  }

  emailVerification( id: string, hash: string ): Observable<EmailVerificationResponse> {
    const url = this.urlEmailVerification + id + '/' + hash;
    return this.http.get<EmailVerificationResponse>(url, this.setOptions(true,true));
  }

  verificarToken(): Observable<any> {
    const response = this.http.get<any>(this.urlTokenVerify, this.setOptions());
    return response;
  }

}
