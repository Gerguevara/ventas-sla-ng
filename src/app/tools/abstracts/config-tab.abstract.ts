import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Input, } from "@angular/core";
import { PerfilUsuario } from '@models/perfil.usuario.model';
import { PerfilUsuarioService } from '@global-services/perfil-usuario.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'master',
  template: ''
})
export abstract class ConfigTab {
  @Input()
  user!: PerfilUsuario;

  constructor(
    protected matSnackBar: MatSnackBar) {
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
}
