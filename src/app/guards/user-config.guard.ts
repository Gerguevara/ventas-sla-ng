import { ConfirmDialogTwoFaComponent } from './../twofa/confirm-dialog-two-fa/confirm-dialog-two-fa.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TwofaService } from '@global-services/twofa.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserConfigGuard implements CanDeactivate<unknown> {
  constructor(
    private twofaService: TwofaService,
    private matDialog: MatDialog
  ){}
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.twofaService.isTwoFactorPending()){
      let dialogResult = this.matDialog.open(ConfirmDialogTwoFaComponent);
      return dialogResult.afterClosed();
    }
    return this.twofaService.twoFactorPendingObservable().pipe(
      map((pending: boolean)=>{
        return !pending;
      })
    );
  }

}
