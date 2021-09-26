import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpleadoService } from '@global-services/empleado.service';
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BreakpointObserver, Breakpoints, BreakpointState } from "@angular/cdk/layout";
import { FormControl, FormGroup } from "@angular/forms";
import { PerfilEmpleado } from "src/app/core/models/perfil.empleado.model";
import { environment } from "@environments/environment";
import { LetterInputContext } from "@tools/models/LetterInputContext";

@Component({
  selector: 'master',
  template: ''
})
export abstract class EmpleadoTab implements OnInit {

  @Input()
  empleado!: PerfilEmpleado;
  @Input()
  formGroup!: FormGroup;
  @Input()
  editableState = false;
  @Input()
  globalSwitch: boolean = false;
  @Output()
  fieldEdited = new EventEmitter<{field: string, value:string}>();
  rowHeight = "500:125";
  contexts: LetterInputContext[] = [];
  photo: string = '';
  flexDirection = 'row';
  columns = 2;

  constructor(
    protected breakpointObserver: BreakpointObserver,
    protected empleadoService: EmpleadoService,
    protected matSnackBar: MatSnackBar) {

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
        console.log('breakpoint setted');
        if(breakpointState.breakpoints[Breakpoints.XSmall]){
          this.setColumnMode();
          this.columns = 1;
        } else if (breakpointState.breakpoints[Breakpoints.Small]) {
          this.setColumnMode();
          this.columns = 1;
        } else if (breakpointState.breakpoints[Breakpoints.Medium]) {
          this.setRowMode();
          this.columns = 2;
        } else if (breakpointState.breakpoints[Breakpoints.Large]) {
          this.setRowMode();
          this.columns = 2;
        } else if (breakpointState.breakpoints[Breakpoints.XLarge]) {
          this.setRowMode();
          this.columns = 3;
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

  editingModeHandler(internalSwitchStatus: boolean){
    this.globalSwitch = internalSwitchStatus;
  }

  valueUpdateHandler(event: LetterInputContext){
    let empleadoAtributo:any = {};
    empleadoAtributo['id'] = this.empleado.user_id;
    empleadoAtributo['user_id'] = this.empleado.user_id;
    empleadoAtributo['user_ide'] = this.empleado.user_ide;
    empleadoAtributo[event.controlName] = event.value;
    this.empleadoService.updateObject(empleadoAtributo).subscribe({
      next: (response:any)=>{
        this.matSnackBar.open(response.mensaje, 'Cerrar', {
          duration: 2000,
        });
        this.fieldEdited.emit({
          field: event.controlName,
          value: event.value
        })
      },
      error: (error:any)=> {
        console.log('error updating object');
        console.log(error);
      }
    })
  }
}
