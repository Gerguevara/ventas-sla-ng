import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Input, } from "@angular/core";
import { PerfilUsuario } from '@models/perfil.usuario.model';
import { PerfilUsuarioService } from '@global-services/perfil-usuario.service';

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
}
