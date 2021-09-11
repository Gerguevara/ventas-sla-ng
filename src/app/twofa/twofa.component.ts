import { RecoverTwoFaComponent } from './recover-two-fa/recover-two-fa.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TwofaService } from '@global-services/twofa.service';
import { Event, Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'sla-twofa',
  templateUrl: './twofa.component.html',
  styleUrls: ['./twofa.component.scss']
})
export class TwofaComponent implements OnInit {
  TOTPForm!: FormGroup;
  codePlaceholder = '### ###';
  constructor(
    private twofaService: TwofaService,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog,
    private permissions: NgxPermissionsService,
    private router: Router,
  ) {
    this.TOTPForm = this.formBuilder.group({
      code: []
    })
  }

  ngOnInit(): void {
  }

  cerrarSesionHandler($event: any){
    $event.preventDefault();$event.stopPropagation();
    this.permissions.flushPermissions();
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/']);
    window.location.reload();
  }

  onSubmit($event: any) {
    $event.preventDefault();$event.stopPropagation();
    this.twofaService.enviarCodigoTOTP(this.codeControl.value).subscribe({
      next:(result: boolean)=>{
        if(result){
          this.matSnackBar.open('Inicio de sesión exitoso','Cerrar',{
            duration: 3000,
          })
          this.router.navigate(['/']);
          window.location.reload();
        } else {
          this.matSnackBar.open('Codigo incorrecto','Cerrar',{
            duration: 3000,
          })
        }
      },
      error:(error: any)=>{
        console.error(error);
        this.matSnackBar.open('Error, contacta a tu administrador','Cerrar',{
          duration: 3000,
        })
      }
    })
  }

  recoverHandler($event: any){
    $event.preventDefault();$event.stopPropagation();
    this.matDialog.open(RecoverTwoFaComponent)
  }

  get codeControl(): FormControl{
    return this.TOTPForm.get('code') as FormControl;
  }

}
