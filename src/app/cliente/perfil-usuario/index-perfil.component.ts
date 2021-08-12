import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'sla-index-perfil',
  templateUrl: './index-perfil.component.html',
  styleUrls: ['./index-perfil.component.scss']
})
export class IndexPerfilComponent implements OnInit {

  habilitarEditar = true;
  perfilForm: FormGroup;

  constructor( private formBuilder: FormBuilder ) {
    this.perfilForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      estadCivil: ['', Validators.required],
      genero: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

}
