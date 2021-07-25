import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginClienteService } from '../core/services/login-cliente.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor( private router: Router, private auth: LoginClienteService ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      /* Este es un Guard que valida que exista el token a través de CanLoad.
         Esto permite que no se carguen componentes hijos de forma perezosa
         si el usuario no ha iniciado sesión. */
      const token = localStorage.getItem('token');
      if ( token !== undefined && token !== '' && token !== null ) {
        return this.auth.verificarToken().then((response: any) => {
          if (response.result) {
            return true;
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('rol');
            window.location.reload();
            return false;
          }
        });
      } else {
        // Redireccionamos a login en caso de no poseer token
        this.router.navigate(['/autentication/login']);
        return false;
      }
  }
}
