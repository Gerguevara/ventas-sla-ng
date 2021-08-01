import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

import { Producto } from '@models/producto.model';
import { ResultadoIndex } from '@models/resultados/resultado-index.model';
import { IndexProductCardComponent } from '../index-product-card/index-product-card.component';
import { promise } from 'protractor';

@Component({
  selector: 'app-index-table',
  templateUrl: './index-table.component.html',
  styleUrls: ['./index-table.component.scss']
})
export class IndexTableComponent implements OnInit {
  @Input()
  resultado! : ResultadoIndex;
  @ViewChild('0')
  firstElement!: IndexProductCardComponent;
  currentMaxProduct = 4;
  columns!: number;
  rowHeight!: string;
  rendered = true;
  constructor(
    private breakpointObserver: BreakpointObserver
    ) {
  }

  ngOnInit(): void {
    this.getColumns();
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
          // this.setRowHeightOver();
        } else if(breakpointState.breakpoints[Breakpoints.Small]){
          this.columns = 2;
          // this.setRowHeightOver();
        } else if(breakpointState.breakpoints[Breakpoints.Medium]){
          this.columns = 3;
          // this.setRowHeightSide();
        } else if(breakpointState.breakpoints[Breakpoints.Large]){
          this.columns = 4;
          // this.setRowHeightSide();
        } else if(breakpointState.breakpoints[Breakpoints.XLarge]){
          this.columns = 8;
          // this.setRowHeightSide();
        } else {
          this.columns = 1;
          // this.setRowHeightSide();
        }
        this.setGridRatio();
    }})
    return this.columns;
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

  setGridRatio() {
      const width = 236.25;
      const height = 457.44;
      this.rowHeight = `${width}:${height}`;
      console.log(`Ratio setted to ${width}:${height}`);
  }
}
