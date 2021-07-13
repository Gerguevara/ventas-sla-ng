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
  token: string;
  tokenType: string;
  mensaje: string;
}

export interface SignUpResponse {
  usuario_empresa: string;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginEmpresasService {

  urlLogin = `${environment.apiUrl}` + 'loginEmpresa';
  urlSignUp = `${environment.apiUrl}` + 'registrarEmpresa';
  private endpoint = 'registrarEmpresa';

  constructor( protected http: HttpClient ) {
    console.log('Running login enterprise service...');
  }

  async uploadImage( form: any ): Promise<any> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': token
      })
    };
    const response = await this.http.post(
      `${environment.apiUrl}${this.endpoint}` + '/uploadImage/', form, httpHeaders).toPromise();
    return response;
  }

  deleteImage(path: string): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': token
      })
    };
    return this.http.post(`${environment.apiUrl}${this.endpoint}` + '/deleteImage', { path }, httpHeaders);
  }

  submitLogin( usuario: string, password: string ): Observable<LoginResponse> {
    const httpBody = {
      username: usuario,
      password: password
    };
    return this.http.post<LoginResponse>(this.urlLogin, httpBody, httpOptions);
  }

  submitRegistro( nombre: string, email: string, nitFrontal: string, nitReverso: string ): Observable<SignUpResponse> {
    const httpBody = {
      nombreComercial: nombre,
      email: email,
      nitFrontal: nitFrontal,
      nitReverso: nitReverso
    };
    return this.http.post<SignUpResponse>(this.urlSignUp, httpBody, httpOptions);
  }

}
