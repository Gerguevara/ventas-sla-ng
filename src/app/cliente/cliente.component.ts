import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';
import { Categoria } from '../core/Models/categoria.model';
import { Resultado } from '../core/Models/resultado.model';
import { CategoriaService } from './../core/services/categoria.service';
import { Router } from '@angular/router';
import { DialogSpinnerComponent } from 'src/app/tools/components/dialog-spinner/dialog-spinner.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginClienteService } from '../core/services/login-cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  @ViewChild('sidenav') sidenav! : MatSidenav;
  title = `${environment.appTitle}`;
  categorias : Categoria[] = [];
  smolWindow : boolean = true;

  // Bandera para inicio de sesión
  iniciarSesion!: boolean;
  rolAdmin!: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    this.sidenavMode()
  }

  constructor(private categoriaService : CategoriaService,
              private router: Router,
              private authCliente: LoginClienteService,
              private dialog: MatDialog ) {
  }

  ngOnInit(): void {
    this.iniciarSesion = true;
    this.rolAdmin = false;
    this.categoriaService.getObjects().subscribe(
      {
        next: (result : Resultado<Categoria>) => this.categorias=result.data,
        complete: () => this.sidenavMode(),
      });
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
      console.log(response);
      this.dialog.closeAll();
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      window.location.reload();
    });
  }

  adminArea(): void {
    this.dialog.open(DialogSpinnerComponent);
    this.router.navigate(['/panel']);
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