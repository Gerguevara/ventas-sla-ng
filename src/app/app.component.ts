import { Component } from '@angular/core';
import { PermissionService } from '@global-services/permission.service';
import { environment } from '@environments/environment';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = `${environment.appTitle}`;

  constructor( private permissionsService: NgxPermissionsService,
               private permissionService: PermissionService )
  {
    // Añadimos los permisos por defecto del usuario no autenticado
    const perm = [''];
    if ( localStorage.getItem('token') ) {
      this.permissionService.getAllPermissions().then((response: string[]) => {
        this.permissionsService.loadPermissions(response);
      }).catch((error: any) => { console.log( error ); });
    } else {
      this.permissionsService.loadPermissions(perm);
    }
  }
}
