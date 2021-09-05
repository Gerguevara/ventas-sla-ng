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
      //todo here
    } else {
      this.showSnackMessage('Campos invalidos, por favor revisa');
    }
  }

  twoFaSwitchHandler($event: MatSlideToggleChange){
    if($event.checked){
      this.twofaService.habilitarTwoFa().subscribe({
        next:()=>{
          this.getQr();
          this.getRecoveryCodes();
          this.showSnackMessage('Habilitado con éxito, por favor almacene sus claves')
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
      next: (codes: string)=>{
        this.currentUserCodes = codes;
      },
      error:()=>this.showSnackMessage('Error obteniendo Codigos de Recuperacion'),
    })
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
