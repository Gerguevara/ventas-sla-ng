import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginClienteService } from '@global-services/login-cliente.service';
import { map } from 'rxjs/operators';

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
      if ( token ) {
        return this.auth.verificarToken().pipe(
          map((response: boolean | string) => {
            if(typeof response === "boolean"){
              if (response) {
                return response;
              } else {
                localStorage.removeItem('token');
                localStorage.removeItem('rol');
                // Redireccionamos a index en caso de resultado invalido
                return this.router.createUrlTree(['/']);
              }
            } else {
              if(response === "2fa"){
                return this.router.createUrlTree(['/confirm']);
              } else {
                return false;
              }
            }
          }));
      } else {
        // Redireccionamos a login en caso de no poseer token
        return this.router.createUrlTree(['/autentication/login']);
      }
  }
}
