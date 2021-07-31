import { ResultadoIndex } from './../../../core/Models/resultado-index.model';
import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

import { Categoria } from '@models/categoria.model';
import { Producto } from '@models/producto.model';
import { Resultado } from '@models/resultado.model';
import { IndexService } from '@global-services/index.service';

@Component({
  selector: 'app-index-table',
  templateUrl: './index-table.component.html',
  styleUrls: ['./index-table.component.scss']
})
export class IndexTableComponent implements OnInit {
  @Input()
  resultado! : ResultadoIndex;
  currentMaxProduct = 4;
  columns!: number;
  rowHeight = "1:1";
  rendered = true;
  constructor(
    private breakpointObserver: BreakpointObserver
    ) {
      this.getColumns();
  }

  ngOnInit(): void {
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
        } else if(breakpointState.breakpoints[Breakpoints.Large]){
          this.columns = 4;
          this.setRowHeightSide();
        } else if(breakpointState.breakpoints[Breakpoints.XLarge]){
          this.columns = 8;
          this.setRowHeightSide();
        } else {
          this.columns = 1;
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
