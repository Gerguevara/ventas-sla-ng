import { ResultadoIndex } from './../../../core/Models/resultado-index.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

import { Categoria } from '@models/categoria.model';
import { Producto } from '@models/producto.model';
import { Resultado } from '@models/resultado.model';
import { IndexService } from '@global-services/index.service';

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
  rowHeight!: string;
  constructor(
    private indexService : IndexService,
    private route : ActivatedRoute,
    private breakpointObserver: BreakpointObserver
    ) {
      this.onResize();
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        let idObtenido = params.get('id')
        if(idObtenido) this.idActual = Number(params.get('id'));
        this.indexService.obtenerCategoria(this.idActual).subscribe(
          (result:ResultadoIndex)=>{
            this.catTitle=result.categoria.nombre
            this.listaProductos = result.productos;
            this.listaProductos = this.listaProductos.filter((producto:Producto)=>producto.id_categoria===this.idActual)
            this.onResize();
          }
        )
        this.indexService.getObjects().subscribe({
          next:(result : Resultado<Producto>)=>{
          }
        })
      }
    )
  }

  setRowHeight(){
    let heigthRatio = (0.00055186559 * window.innerWidth) + 1.211;
    this.rowHeight = `1:${heigthRatio}`;
  }

  onResize() {
    this.setRowHeight();
    this.breakpointObserver.observe(
      [
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ]
    ).subscribe({
      next: (breakpointState: BreakpointState)=>{
        if(breakpointState.breakpoints[Breakpoints.XSmall]){
          this.breakpoint = 1;
        };
        if(breakpointState.breakpoints[Breakpoints.Small]){
          this.breakpoint = 2;
        };
        if(breakpointState.breakpoints[Breakpoints.Medium]){
          this.breakpoint = 3;
        }
        if(breakpointState.breakpoints[Breakpoints.Large]){
          this.breakpoint = 4;
        }
        if(breakpointState.breakpoints[Breakpoints.XLarge]){
          this.breakpoint = 6;
        }
        this.setRowHeight();
    }})
  }

}
