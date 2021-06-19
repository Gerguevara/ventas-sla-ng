import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaService } from './services/categoria.service';
import { EtiquetaService } from './services/etiqueta.service';
import { ProductoService } from './services/producto.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    CategoriaService,
    EtiquetaService,
    ProductoService
  ]
})
export class CoreModule { }
