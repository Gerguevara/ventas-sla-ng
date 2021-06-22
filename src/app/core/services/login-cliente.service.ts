import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecursoService } from './recurso.service';
import { Cliente } from '../Models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class LoginClienteService extends RecursoService<Cliente> {

  constructor( protected http: HttpClient ) {
    super('login', http);
  }
}
