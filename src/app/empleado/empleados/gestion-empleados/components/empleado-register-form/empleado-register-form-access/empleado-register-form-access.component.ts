import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-empleado-register-form-access',
  templateUrl: './empleado-register-form-access.component.html',
  styleUrls: ['./empleado-register-form-access.component.scss']
})
export class EmpleadoRegisterFormAccessComponent implements OnInit {
  @Input()
  formGroup!: FormGroup;
  columns: number;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
    this.columns = 2;
  }

  ngOnInit(): void {
    this.setColumns();
    console.log(this.columns)
  }

  setColumns(){
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe({
      next: (breakpointState: BreakpointState)=>{
        if(breakpointState.breakpoints[Breakpoints.XSmall]){
          this.columns=1;
        } else if(breakpointState.breakpoints[Breakpoints.Small]){
          this.columns=1;
        } else if(breakpointState.breakpoints[Breakpoints.Medium]){
          this.columns=1;
        } else if(breakpointState.breakpoints[Breakpoints.Large]){
          this.columns=2;
        } else if(breakpointState.breakpoints[Breakpoints.XLarge]){
          this.columns=3;
        }
      }
    })
  }

  getErrorMessage(control: FormControl){
    let message = '';
    let { errors } = control;
    if(errors){
      const errorsKeys = Object.keys(errors);
      errorsKeys.forEach((key: string) => {
        const errorMessage = String(key);
        message = message.concat(`${errorMessage} `);
      });
    }
    return message;
  }

  get nombresControl(): FormControl {
    return this.formGroup.get('nombres') as FormControl;
  }

  get apellidosControl(): FormControl {
    return this.formGroup.get('apellidos') as FormControl;
  }

  get emailControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }
}
