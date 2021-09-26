import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { PerfilUsuario } from 'src/app/core/models/perfil.usuario.model';
import { UsuarioService } from '@global-services/usuario.service';
import { PerfilUsuarioService } from '@global-services/perfil-usuario.service';
import { PartialObserver } from 'rxjs';

@Component({
  selector: 'sla-config-usuario-container',
  templateUrl: './config-usuario-container.component.html',
  styleUrls: ['./config-usuario-container.component.scss']
})
export class ConfigUsuarioContainerComponent implements OnInit {

  user!: PerfilUsuario;
  constructor(
    protected perfilUsuarioService: PerfilUsuarioService,
    protected usuarioService: UsuarioService,
    private matSnackBar: MatSnackBar
    ) {
      this.getCurrentUser();
    }

  changeEmailObserver: PartialObserver<{resultado: boolean;mensaje: string;}>= {
    next: (response: {resultado: boolean;mensaje: string;}) => {this.matSnackBar.open(response.mensaje,'Cerrar',{duration:3000})},
  }

  ngOnInit(): void {
  }

  getCurrentUser(){
    this.perfilUsuarioService.getCurrentUserProfile().subscribe({
      next: (perfil: PerfilUsuario)=> this.user = perfil,
    })
  }

  emailChangeHandler($event: string){
    this.usuarioService.patchUser({ email: $event }).subscribe(this.changeEmailObserver);
  }

}
