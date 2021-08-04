import { Component, Input, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints, BreakpointState } from "@angular/cdk/layout";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { PerfilEmpleado } from "@models/perfil.empleado.model";
import { environment } from "@environments/environment";

@Component({
  selector: 'master',
  template: ''
})
export abstract class EmpleadoTab implements OnInit {

  @Input()
  empleado!: PerfilEmpleado;
  photo: string = '';
  flexDirection = 'row';
  editable = false;

  constructor(protected breakpointObserver: BreakpointObserver) {

  }

  ngOnInit(): void {
    this.breakpointObserver.observe(
      [
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ]
    ).subscribe({
      next: (breakpointState: BreakpointState)=> {
        if(breakpointState.breakpoints[Breakpoints.XSmall]){
          this.setColumnMode();
        } else if (breakpointState.breakpoints[Breakpoints.Small]) {
          this.setColumnMode();
        } else if (breakpointState.breakpoints[Breakpoints.Medium]) {
          this.setRowMode();
        } else if (breakpointState.breakpoints[Breakpoints.Large]) {
          this.setRowMode();
        } else if (breakpointState.breakpoints[Breakpoints.XLarge]) {
          this.setRowMode();
        }
      }
    })
  }

  setColumnMode(){
    this.flexDirection='column';
  }

  setRowMode(){
    this.flexDirection='row';
  }

  photoErrorHandler(){
    this.photo = environment.defaultUserPhotoImage;
  }

  toggleEdit($event: MatSlideToggleChange){
    this.editable = $event.checked;
  }

}
