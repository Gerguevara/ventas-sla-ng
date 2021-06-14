import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor( private router: Router ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      /* Este es un Guard que valida que exista el token a través de CanLoad.
         Esto permite que no se carguen componentes hijos de forma perezosa
         si el usuario no ha iniciado sesión. */
      const token = localStorage.getItem('token');
      if ( token !== undefined && token !== '' && token !== null ) {
        // Si existe el token, permitimos la carga del modulo
        return true;
      } else {
        // Redireccionamos a login en caso de no poseer token
        this.router.navigate(['/autentication/login']);
        return false;
      }
  }
}
