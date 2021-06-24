import { Categoria } from './../../../empleado/models/categoria.models';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/core/Models/producto.model';
import { Resultado } from 'src/app/core/Models/resultado.model';
import { ProductoService } from 'src/app/core/services/producto.service';

@Component({
  selector: 'app-index-categoria',
  templateUrl: './index-categoria.container.html',
  styleUrls: ['./index-categoria.container.scss']
})
export class IndexCategoriaContainer implements OnInit {
  idActual : number = -1;
  listaProductos : Producto[] = [];
  breakpoint?: number= 4;
  catTitle:string = "";
  constructor(
    private productoService : ProductoService,
    private route : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        let idObtenido = params.get('id')
        if(idObtenido) this.idActual = Number(params.get('id'));
        this.productoService.obtenerCategoriaProducto(this.idActual).subscribe(
          (result:Categoria)=>{this.catTitle=result.nombre}
        )
        this.productoService.obtenerListaProductos().subscribe({
          next:(result : Resultado<Producto>)=>{
              this.listaProductos = result.data;
              this.listaProductos = this.listaProductos.filter((producto:Producto)=>producto.id_categoria===this.idActual)
              this.onResize();
          }
        })
      }
    )
  }
  
  onResize() {
    if((window.matchMedia("(max-width: 1199px)").matches)&&(window.matchMedia("(min-width: 950px)").matches)){
      this.breakpoint = 3;
    }else if((window.matchMedia("(max-width: 949px)").matches)&&(window.matchMedia("(min-width: 650px)").matches)){
      this.breakpoint = 2;
    } else if((window.matchMedia("(max-width: 649px)").matches)){
      this.breakpoint = 1;
    } if((window.matchMedia("(min-width: 1200px)").matches)){
      this.breakpoint = 4;
    }
  }

}
