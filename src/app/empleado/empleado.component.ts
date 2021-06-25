import { Component, HostListener, OnChanges, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {
  @ViewChild('sidenav') sidenav! : MatSidenav;
  title = "Panel de administración";//`${environment.appTitle}`;
  smolWindow : boolean = true;
  
  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    this.sidenavMode()
  }

  constructor() {
    this.sidenavMode()
  }

  ngOnInit(): void {
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
