import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

const httpBody = {
  email: 'iwisoky@example.com',
  password: 'password'
};

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  urlApi = 'http://localhost:8000/api/login';

  constructor( private http: HttpClient ) {
    console.log('Running Autentication Service...');
  }

  submitLogin(): Observable<any> {
    return this.http.post<any>(this.urlApi, httpBody, httpOptions);
  }

}
