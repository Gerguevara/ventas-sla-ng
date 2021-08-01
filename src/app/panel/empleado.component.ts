import { Component, HostListener, OnChanges, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';

import { DialogSpinnerComponent } from '@tool-components/dialog-spinner/dialog-spinner.component';
import { LoginClienteService } from '@global-services/login-cliente.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {

  // Bandera para inicio de sesión
  iniciarSesion!: boolean;
  rolAdmin!: boolean;
  window = window;
  @ViewChild('sidenav') sidenav! : MatSidenav;
  title = "Panel de administración";//`${environment.appTitle}`;
  smolWindow : boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    this.sidenavMode()
  }

  constructor( private router: Router, private dialog: MatDialog,
               private authCliente: LoginClienteService,
               private permissions: NgxPermissionsService ) {
    this.sidenavMode()
  }

  ngOnInit(): void {
    this.iniciarSesion = true;
    this.rolAdmin = false;
    // Validación de usuario logeado
    if (localStorage.getItem('token')) {
      this.iniciarSesion = false;
    }
    // Validación de rol usuario
    if (localStorage.getItem('rol')) {
      if (localStorage.getItem('rol') === 'admin') {
        this.rolAdmin = true;
      }
    }
  }

  // Método para iniciar sesión
  iniciarSesionClick(): void {
    this.router.navigate(['/autentication/login']);
  }
  // Método para cerrar sesión
  cerrarSesionClick(): void {
    this.dialog.open(DialogSpinnerComponent);
    this.authCliente.submitLogout().subscribe((response: any) => {
      this.dialog.closeAll();
      this.permissions.flushPermissions();
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      this.router.navigate(['/']);
    });
  }

  adminArea(): void {
    this.dialog.open(DialogSpinnerComponent);
    this.router.navigate(['/']);
    this.dialog.closeAll();
  }

  sidenavMode(){
    if(this.sidenav)
      if(window.matchMedia("(max-width: 700px)").matches){
        this.sidenav.close();
        this.sidenav.mode="over";
        this.smolWindow=true;
      } else {
        this.sidenav.open();
        this.sidenav.mode="side";
        this.smolWindow=false;
      }
  }

}
