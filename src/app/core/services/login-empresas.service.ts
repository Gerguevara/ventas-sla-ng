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
  urlUploadServer = 'http://dr17010pdm115.000webhostapp.com/upload.php';

  constructor( protected http: HttpClient ) {
    console.log('Running login enterprise service...');
  }

  subirImagen( form: any, hash: string ): Observable<any> {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': token
      })
    };
    return this.http.post<any>('http://dr17010pdm115.000webhostapp.com/upload.php?fileHash=' + hash, JSON.stringify(form.value));
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
