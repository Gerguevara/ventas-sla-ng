import { TwofaService } from '@global-services/twofa.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TwoFaGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(
    private router: Router,
    private twofaService: TwofaService,
    ){
    }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('token')){
        return this.twofaService.obtenerEstadoBloqueo().pipe(
          map(
            (result:boolean)=>{
              if(!result){
                return this.router.createUrlTree(['/']);
              }
              return result;
            }
          )
        )
      } else {
        return this.router.createUrlTree(['/autentication/login']);
      }
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.twofaService.obtenerEstadoBloqueo().pipe(
        map((blocked: boolean)=>{
          if(blocked){
            return false;
          } else {
            return this.router.createUrlTree(['/']);
          }
        })
      )
    }

}
