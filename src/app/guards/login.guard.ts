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
    /* Este Guard es para Login, si ya esta autenticado redirije a index, sino entonces permite acceder a login. */
       if ( localStorage.getItem('token') ) {
        // Si existe el token, redireccionamos a index
        this.router.navigate(['/']);
        return false;
       } else {
        // Si no, dejamos acceder al auth
        return true;
       }
  }
}
