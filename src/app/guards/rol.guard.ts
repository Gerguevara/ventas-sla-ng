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
       if ( rol !== 'admin' ) {
       // Si existe el token, redireccionamos a index
         this.router.navigate(['/']);
         return false;
       } else {
         // Si no, dejamos acceder al auth
         return true;
       }
  }
}
