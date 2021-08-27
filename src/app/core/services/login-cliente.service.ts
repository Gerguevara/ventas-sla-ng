import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { LoginResponse } from '@tool-models/LoginResponse';
import { SignUpResponse } from '@tool-models/SignUpResponse';
import { EmailVerificationResponse } from '@tool-models/EmailVerificationResponse';
import { PreflightService } from '@tool-services/preflight-service';

@Injectable({
  providedIn: 'root'
})
export class LoginClienteService extends PreflightService{

  urlLogin = `${environment.apiUrl}login`;
  urlLogout = `${environment.apiUrl}logout`;
  urlSignUp = `${environment.apiUrl}register`;
  urlEmailVerification = `${environment.apiUrl}verifyEmail/`;
  urlForgotPass = `${environment.apiUrl}forgotPassword`;
  urlResetPass = `${environment.apiUrl}resetPassword`;
  urlTokenVerify = `${environment.apiUrl}tokenVerify`;

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
    const url = `${this.urlEmailVerification}${id}/${hash}`;
    return this.http.get<EmailVerificationResponse>(url, this.setOptions(true,true));
  }

  verificarToken(): Observable<boolean> {
    return this.http.get<boolean>(this.urlTokenVerify, this.setOptions());
  }

}
