import { IndexService } from './../../../core/services/index.service';
import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from 'src/app/core/Models/categoria.model';
import { Producto } from 'src/app/core/Models/producto.model';
import { Resultado } from 'src/app/core/Models/resultado.model';
import { ProductoService } from 'src/app/core/services/producto.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-index-table',
  templateUrl: './index-table.component.html',
  styleUrls: ['./index-table.component.scss']
})
export class IndexTableComponent implements OnInit {
  @Input()
  categoria! : Categoria;
  productos : Producto[] = [];
  currentMaxProduct = 4;
  columns!: number;
  rowHeight = "1:1";
  rendered = true;
  constructor(
    private indexService: IndexService,
    private breakpointObserver: BreakpointObserver
    ) {
      this.getColumns();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.indexService.getObjects().subscribe({
      next: (res : Resultado<Producto>)=>{
        this.productos = res.data.filter((prod:Producto)=>prod.id_categoria===this.categoria.id)//cambiar por servicio que filtre productos por categorias
        if(this.productos.length > 0){
          this.rendered = true;
          this.productos=this.productos.sort(this.comparador);
          if(this.productos.length > this.currentMaxProduct){
            this.productos = this.productos.slice(0,this.currentMaxProduct);
          }
        } else {
          this.rendered = false;
        }
      }
    });
  }

  getColumns(){
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
          this.columns = 1;
          this.setRowHeightOver();
        } else if(breakpointState.breakpoints[Breakpoints.Small]){
          this.columns = 2;
          this.setRowHeightOver();
        } else if(breakpointState.breakpoints[Breakpoints.Medium]){
          this.columns = 3;
          this.setRowHeightSide();
        } else {
          this.columns = 4;
          this.setRowHeightSide();
        }
    }})
    return this.columns;
  }

  setRowHeightSide(){
    let heigthRatio = 2.385167325202 - (0.00043538478310625 * window.innerWidth) ;
    this.rowHeight = `1:${heigthRatio}`;
  }

  setRowHeightOver(){
    let heigthRatio = 1.8899842756214 - (0.00019319338 * window.innerWidth);
    this.rowHeight = `1:${heigthRatio}`;
  }

  comparador(productoA : Producto, productoB : Producto) {
    if (Number(productoA.calificacion_promedio) < Number(productoB.calificacion_promedio )){
      return -1;
    }
    if (Number(productoA.calificacion_promedio) > Number(productoB.calificacion_promedio) ){
      return 1;
    }
    return 0;
  }

}
