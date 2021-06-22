import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecursoService } from './recurso.service';
import { Auth } from '../Models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class LoginEmpresasService extends RecursoService<Auth> {

  constructor( protected http: HttpClient ) {
    super('loginEmpresa', http);
  }
}
