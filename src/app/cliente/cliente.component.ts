import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';

import { NgxPermissionsService } from 'ngx-permissions';

import { environment } from '@environments/environment';
import { Categoria } from '@models/categoria.model';

import { IndexService } from '@global-services/index.service';
import { LoginClienteService } from '@global-services/login-cliente.service';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  @ViewChild('sidenav') sidenav! : MatSidenav;
  categorias: Categoria[] = [];
  openDefault: boolean = true;
  mode: MatDrawerMode = 'side';

  title = environment.appTitle;
  bannerText = environment.bannerText;
  window = window;

  // Bandera para inicio de sesión
  iniciarSesion!: boolean;
  rolAdmin!: boolean;


  constructor(
    private router: Router,
    private authCliente: LoginClienteService,
    private dialog: MatDialog,
    private permissions: NgxPermissionsService,
    private breakpointObserver: BreakpointObserver,
    private indexService: IndexService
    ) {
    this.sidenavMode();
  }

  ngOnInit(): void {
    this.iniciarSesion = true;
    this.indexService.obtenerCategorias().subscribe(
      {
        next: (result : Categoria[]) => {
          this.categorias = result;
        }
      });
    // Validación de usuario logeado
    if (localStorage.getItem('token')) {
      this.iniciarSesion = false;
    }
  }

  // Método para cerrar sesión
  cerrarSesionClick(): void {
    this.authCliente.submitLogout().subscribe((response: any) => {
      this.permissions.flushPermissions();
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      this.router.navigate([this.router.url]);
    });
  }

  mostrarPerfil(): void {
    this.dialog.open( PerfilUsuarioComponent, { width: '40vw' } );
  }

  flushLocalStorage(){
    localStorage.clear();
  }

  sidenavMode(){
    this.breakpointObserver.observe(
      [
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ]
    ).subscribe({
      next: (breakpointState: BreakpointState)=>{
        if(this.sidenav){
          if(breakpointState.breakpoints[Breakpoints.XSmall]){
            this.setOverSidenav();
          } else if (breakpointState.breakpoints[Breakpoints.Small]) {
            this.setOverSidenav();
          } else if (breakpointState.breakpoints[Breakpoints.Medium]) {
            this.setSideSidenav();
          } else if (breakpointState.breakpoints[Breakpoints.Large]) {
            this.setSideSidenav();
          } else if (breakpointState.breakpoints[Breakpoints.XLarge]) {
            this.setSideSidenav();
          }
        }
      }
    });
  }

  setSideSidenav(){
    this.sidenav.open();
    this.mode= 'side';
    this.openDefault=true;
  }

  setOverSidenav(){
    this.sidenav.close();
    this.mode='over';
    this.openDefault=false;
  }
}
