import { UsuarioService } from '@global-services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ConfigTab } from '@tools/abstracts/config-tab.abstract';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'sla-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent extends ConfigTab implements OnInit {
  formGroup: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    protected formBuilder: FormBuilder,
    protected matSnackBar: MatSnackBar,
  ) {
    super(matSnackBar);
    this.formGroup = formBuilder.group(
      {
        oldPassword : [],
        newPassword : [],
        newPasswordConfirmation : [],
      }
    );
  }

  ngOnInit(): void {
  }

  submitHandler(){
    this.usuarioService.changePassword(this.oldPasswordControl.value, this.newPasswordControl.value, this.newPasswordConfirmationControl.value).subscribe(
      {
        next: (result:string)=>{
          console.log(result);
          this.matSnackBar.open(result,'Cerrar');
          this.formGroup.reset();
        },
        error: (err: any)=>{
          console.error(err);
          if(err.status === 422){
            this.matSnackBar.open('Validacion incorrecta','Cerrar');
          } else {
            this.matSnackBar.open('Ha ocurrido un error cambiando la contraseña','Cerrar');
          }
        },
      }
    );
  }

  get oldPasswordControl(): FormControl {
    return this.formGroup.get('oldPassword') as FormControl;
  }
  get newPasswordControl(): FormControl {
    return this.formGroup.get('newPassword') as FormControl;
  }
  get newPasswordConfirmationControl(): FormControl {
    return this.formGroup.get('newPasswordConfirmation') as FormControl;
  }

}
