import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PerfilUsuario } from '@core/models/perfil.usuario.model';
import { PerfilUsuarioService } from '@core/services/perfil-usuario.service';
import { DialogSpinnerComponent } from '../../tools/components/dialog-spinner/dialog-spinner.component';

@Component({
  selector: 'sla-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

  habilitarEditar = true;
  perfilForm: FormGroup;

  constructor( private formBuilder: FormBuilder, private perfilService: PerfilUsuarioService,
               private snackBar: MatSnackBar,
               private dialog: MatDialog ) {
    this.perfilForm = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.pattern(/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/)]],
      apellidos: ['', [Validators.required, Validators.pattern(/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/)]],
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
    } else {
      this.snackBar.open('Usuario no autenticado', 'Cerrar', { duration: 5000 });
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

  actualizarFormulario(): void {
    this.dialog.open( DialogSpinnerComponent );
    this.perfilService.actualizarPerfilUsuario(this.perfilForm.value as PerfilUsuario).subscribe((response: any) => {
      this.snackBar.open('Has actualizado tu perfil', 'Cerrar', { duration: 5000 });
      this.dialog.closeAll();
    },
    (error: any) => {
      console.log(error);
      this.snackBar.open('Ha ocurrido un error', 'Cerrar', { duration: 5000 });
      this.dialog.closeAll();
    });
  }
}
