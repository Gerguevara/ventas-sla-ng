import { DepartamentoService } from './services/departamento.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaService } from './services/categoria.service';
import { EtiquetaService } from './services/etiqueta.service';
import { ProductoService } from './services/producto.service';
import { EstadoOrdenPipe } from './pipes/estado-orden.pipe';



@NgModule({
  declarations: [
    EstadoOrdenPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    CategoriaService,
    EtiquetaService,
    ProductoService,
    DepartamentoService
  ]
})
export class CoreModule { }
