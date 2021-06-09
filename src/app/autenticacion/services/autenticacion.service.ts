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

/*const httpBody = {
  email: 'janie81@example.org',
  password: 'password'
};*/

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  urlApi = 'http://localhost:8000/api/login';

  constructor( private http: HttpClient ) {
    console.log('Running Autentication Service...');
  }

  submitLogin( email: string, password: string ): Observable<LoginResponse> {
    const httpBody = {
      email,
      password
    };
    return this.http.post<LoginResponse>(this.urlApi, httpBody, httpOptions);
  }

}
