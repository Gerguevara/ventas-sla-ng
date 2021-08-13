import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilUsuario } from '@core/models/perfil.usuario.model';
import { PerfilUsuarioService } from '@core/services/perfil-usuario.service';

@Component({
  selector: 'sla-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

  habilitarEditar = true;
  perfilForm: FormGroup;

  constructor( private formBuilder: FormBuilder, private perfilService: PerfilUsuarioService ) {
    this.perfilForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      genero: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.perfilForm.disable();
    const id = localStorage.getItem('user_identity');
    if ( id ) {
      this.perfilService.obtenerPerfilUsuario( Number(id) ).subscribe((response: PerfilUsuario[]) => {
        this.cargarDatos( response[0] );
      },
      (error: any) => {
        console.log(error);
      });
    }
  }

  cargarDatos( perfil: PerfilUsuario ): void {
    this.perfilForm.get('nombres')?.setValue(perfil.nombres);
    this.perfilForm.get('apellidos')?.setValue(perfil.apellidos);
    this.perfilForm.get('telefono')?.setValue(perfil.telefono);
    this.perfilForm.get('direccion')?.setValue(perfil.direccion);
    this.perfilForm.get('estadoCivil')?.setValue(perfil.estadoCivil);
    this.perfilForm.get('genero')?.setValue(perfil.genero);
  }

  editarFormulario(): void {
    this.perfilForm.enable();
    this.habilitarEditar = false;
  }
}
