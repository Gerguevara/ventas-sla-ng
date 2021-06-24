import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {

  constructor( private router: Router ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /* Este es un Guard no permite entrar al modulo de autenticación si
       la sesión está iniciada. */
       const token = localStorage.getItem('token');
       if ( token !== undefined && token !== '' && token !== null ) {
       // Si existe el token, redireccionamos a index
         this.router.navigate(['/']);
         return false;
       } else {
         // Si no, dejamos acceder al auth
         return true;
       }
  }
}
