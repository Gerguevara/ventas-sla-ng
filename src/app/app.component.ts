import { NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';
import { PermissionService } from '@global-services/permission.service';
import { environment } from '@environments/environment';
import { NgxPermissionsService } from 'ngx-permissions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = `${environment.appTitle}`;
  routerSubscription: Subscription;

  constructor(
    private permissionsService: NgxPermissionsService,
    private permissionService: PermissionService,
    private router: Router
  ) {
    // Añadimos los permisos por defecto del usuario no autenticado
    const perm = [''];
    if ( localStorage.getItem('token') ) {
      this.permissionService.getPermissionsUser().subscribe({
        next: (response: string[]) => this.permissionsService.loadPermissions(response),
        error: (error: any) => console.log( error ),
      });
    } else {
      this.permissionsService.loadPermissions(perm);
    }
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         // Trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
      }
    });
  }

  ngOnDestroy(){
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
