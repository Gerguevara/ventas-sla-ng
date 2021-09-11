import { TwofaService } from '@global-services/twofa.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigTab } from '@tools/abstracts/config-tab.abstract';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'sla-twofa',
  templateUrl: './twofa.component.html',
  styleUrls: ['./twofa.component.scss']
})
export class TwofaComponent extends ConfigTab implements OnInit {
  isChecked = false;
  formGroup: FormGroup;
  currentUserQr?: SafeHtml;
  currentUserCodes?: string;

  constructor(
    protected formBuilder: FormBuilder,
    protected matSnackBar: MatSnackBar,
    private twofaService: TwofaService,
    private sanitizer: DomSanitizer,
    ) {
    super(matSnackBar);
    this.formGroup = formBuilder.group(
      {
        code : [],
      }
    )
  }

  ngOnInit(): void {
    this.twofaService.obtenerEstadoTwoFa().subscribe({
      next: (result: boolean)=>{
        this.isChecked= result;
        if(result){
          this.getQr();
          this.getRecoveryCodes();
        }
      },
      error:(error: any)=>{
        console.log(error);
        this.showSnackMessage('Error obteniendo estado de 2fa')
      },
    });
  }

  submitHandler(){
    if(this.formGroup.valid){
      this.twofaService.enviarCodigoTOTP(this.codeControl.value).subscribe({
        next:(result: boolean)=>{
          if(result){
            this.twofaService.confirmTwoFactorAuth();
            this.showSnackMessage('Autenticación a dos pasos confirmada');
          }
        }
      })
    } else {
      this.showSnackMessage('Campos invalidos, por favor revisa');
    }
  }

  twoFaSwitchHandler($event: MatSlideToggleChange){
    if($event.checked){
      this.twofaService.habilitarTwoFa().subscribe({
        next:()=>{
          this.isChecked= true;
          this.twofaService.activateTwoFactorAuth();
          this.getQr();
          this.getRecoveryCodes();
          this.showSnackMessage('Habilitado con éxito, por favor escanee su código QR y almacene sus claves')
        },
        error:()=>this.showSnackMessage('Error habilitando 2fa'),
      });
    } else {
      this.twofaService.deshabilitarTwoFa().subscribe({
        next: ()=>{
          this.isChecked= false;
        },
        error: ()=>{}
      })
    }
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

  getRecoveryCodes(){
    this.twofaService.obtenerCodigosRecuperacion().subscribe({
      next: (codes: string[])=>{
        console.log(codes);
        this.currentUserCodes = this.displayCodes(codes);
        console.log(this.currentUserCodes);
      },
      error:()=>this.showSnackMessage('Error obteniendo Codigos de Recuperacion'),
    })
  }

  displayCodes(codes: string[]): string{
    let outputString = '';
    codes.forEach((value)=>{
      outputString = outputString.concat(`${value}<br/>`);
    })
    return outputString;
  }

  showSnackMessage(message: string){
    this.matSnackBar.open(message, 'Cerrar', {
      duration: 3000,
    })
  }

  get codeControl(): FormControl {
    return this.formGroup.get('code') as FormControl;
  }

}
