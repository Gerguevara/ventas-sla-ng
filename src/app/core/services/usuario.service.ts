import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '@models/usuario.model';
import { environment } from '@environments/environment';
import { RecursoService } from './recurso.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends RecursoService<Usuario>{

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(environment.endpoints.usuarios, httpClient);
  }

  patchUser(resource: any): Observable<{resultado:boolean,mensaje:string}>  {
    const options = this.setOptions(true,false,resource);
    return this.httpClient.patch<{resultado:boolean,mensaje:string}>(`${this.API_URL}`,resource, options);
  }
}
