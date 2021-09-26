import { TwofaService } from '@global-services/twofa.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TwoFaBlockGuard implements CanLoad {
  constructor(
    private router: Router,
    private twofaService: TwofaService,
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('token')){
        return this.twofaService.obtenerEstadoBloqueo().pipe(
          map(
            (blocked: boolean)=>{
              if(blocked){
                return this.router.createUrlTree(['/confirm']);
              } else {
                return true;
              }
            }
          )
        )
      } else {
        return true;
      }
    }
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(localStorage.getItem('token')){
          return this.twofaService.obtenerEstadoBloqueo().pipe(
            map(
              (blocked: boolean)=>{
                if(blocked){
                  return this.router.createUrlTree(['/confirm']);
                } else {
                  return true;
                }
              }
            )
          )
        } else {
          return true;
        }
      }
}
