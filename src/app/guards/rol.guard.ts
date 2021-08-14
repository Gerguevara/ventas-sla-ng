import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanLoad {

  constructor( private router: Router ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /* Este es un Guard no permite entrar al modulo de autenticación si
       la sesión está iniciada. */
       const rol = localStorage.getItem('rol');
       if ( rol === 'E' ) {
        // Si es
        return true;
       } else {
        // Si el rol no es de Empleado, regresar a index
        return this.router.createUrlTree(['/']);
       }
  }
}
