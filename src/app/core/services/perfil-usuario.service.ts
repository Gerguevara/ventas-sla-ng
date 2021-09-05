import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PerfilUsuario } from '@models/perfil.usuario.model';
import { environment } from '@environments/environment';
import { PreflightService } from '@tool-services/preflight-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService extends PreflightService {

  private endpoint = environment.endpoints.perfilUsuario;
  private url = `${environment.apiUrl}${this.endpoint}`;

  constructor( private http: HttpClient ) {
    super();
  }

  /**
   * @ngdoc method
   * @name PerfilUsuarioService:getCurrentUserProfile
   * @description
   * Método de servicio que obtiene el perfil de usuario del usuario actualmente conectado
   * @returns Un observable del perfil del usuario actual
   */
  getCurrentUserProfile(): Observable<PerfilUsuario>{
    return this.http.get<PerfilUsuario>(this.url, this.setOptions())
  }

  /**
   * @ngdoc method
   * @name PerfilUsuarioService:getCurrentUserEmail
   * @description
   * Método de servicio que obtiene correo del usuario actual, si se provee un observador de perfil de usuario, se retornará el email del usuario provisto, y en caso contrario si no se provee observador, se retornará el email del usuario actualmente conectado.
   * @param currentUser (opcional) observable con el que se trabajará
   * @returns Un observable del perfil del usuario actual
   */
  getCurrentUserEmail(currentUser?: Observable<PerfilUsuario>): Observable<string>{
    const user: Observable<PerfilUsuario> = currentUser? currentUser : this.getCurrentUserProfile();
    return user.pipe(
      map((perfil: PerfilUsuario)=>{
        return perfil.email;
      })
    );
  }

  obtenerPerfilUsuario( id: number ): Observable<PerfilUsuario[]> {
    return this.http.get<PerfilUsuario[]>(`${this.url}/${id}`, this.setOptions());
  }

  actualizarPerfilUsuario( perfil: PerfilUsuario ): Observable<any> {
    return this.http.put<any>(this.url + '/' + localStorage.getItem('user_identity'), perfil, this.setOptions());
  }
}
