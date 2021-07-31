import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaContainer } from './categoria/categoria.container';
import { TableCategoriaComponent } from './components/table-categoria/table-categoria.component';
import { FormCategoriaComponent } from './components/form-categoria/form-categoria.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DeleteCategoriaComponent } from './components/delete-categoria/delete-categoria.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [
    CategoriaContainer,
    TableCategoriaComponent,
    FormCategoriaComponent,
    DeleteCategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatRippleModule,
    NgxPermissionsModule.forChild()
  ]
})
export class CategoriaModule { }
