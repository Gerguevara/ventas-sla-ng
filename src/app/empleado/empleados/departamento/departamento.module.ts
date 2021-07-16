import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoFormComponent } from './components/departamento-form/departamento-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DepartamentoFormComponent
  ],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule
  ]
})
export class DepartamentoModule { }
