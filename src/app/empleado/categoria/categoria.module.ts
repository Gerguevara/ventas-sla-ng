import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaContainer } from './categoria/categoria.container';
import { TableCategoriaComponent } from './components/table-categoria/table-categoria.component';
import { FormCategoriaComponent } from './components/form-categoria/form-categoria.component';


@NgModule({
  declarations: [
    CategoriaContainer,
    TableCategoriaComponent,
    FormCategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule
  ]
})
export class CategoriaModule { }
