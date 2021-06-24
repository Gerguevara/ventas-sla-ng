import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';
import { Categoria } from '../core/Models/categoria.model';
import { Resultado } from '../core/Models/resultado.model';
import { CategoriaService } from './../core/services/categoria.service';

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

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    this.sidenavMode()
  }

  constructor(private categoriaService : CategoriaService) {
  }

  ngOnInit(): void {
    this.categoriaService.getObjects().subscribe(
      {
        next: (result : Resultado<Categoria>) => this.categorias=result.data,
        complete: () => this.sidenavMode(),
      });
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