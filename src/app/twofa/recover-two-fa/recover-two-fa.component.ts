import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TwofaService } from '@global-services/twofa.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'sla-recover-two-fa',
  templateUrl: './recover-two-fa.component.html',
  styleUrls: ['./recover-two-fa.component.scss']
})
export class RecoverTwoFaComponent implements OnInit {

  RecoveryForm!: FormGroup;
  codePlaceholder = '##########-##########';
  validRecoveryCode = false;
  currentUserCodes?: string;
  currentUserQr?: SafeHtml;

  constructor(
    private twofaService: TwofaService,
    private formBuilder: FormBuilder,
    private permissions: NgxPermissionsService,
    private matSnackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) {
    this.RecoveryForm = this.formBuilder.group({
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
    this.twofaService.obtenerCodigosRecuperacion().subscribe(
      {
        next: (codes: string[]) => {
          codes.forEach(
            (value)=>{
              console.log(`${value} === ${this.codeControl.value} ?`)
              if(value === this.codeControl.value){
                this.validRecoveryCode = true;
                this.getQr();
              }
            }
          );
        },
        error: () => this.showSnackMessage('Error al verificar el codigo de recuperacion')
      }
    )
  }

  get codeControl(): FormControl{
    return this.RecoveryForm.get('code') as FormControl;
  }

  getQr(){
    this.twofaService.obtenerCodigoQr().subscribe({
      next: (code: string)=>{
        const qr = this.sanitizer.bypassSecurityTrustHtml(code);
        this.currentUserQr = qr? qr : 'QR not found';
      },
      error:()=>this.showSnackMessage('Error obteniendo QR'),
    });
  }

  showSnackMessage(message: string){
    this.matSnackBar.open(message, 'Cerrar', {
      duration: 3000,
    })
  }


}
