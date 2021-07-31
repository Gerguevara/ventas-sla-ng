import { Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { Resultado } from '@models/resultado.model';
import { Producto } from '@models/producto.model';
import { ProductoService } from '@global-services/producto.service';

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.scss']
})
export class IndexProductoComponent implements OnInit {
  @ViewChild('panelForm') panel!: MatExpansionPanel;
  panelTitle!: String;
  title=`Agregar un nuevo producto`;
  data?: Producto[];

  constructor(
    private productoService: ProductoService
    ) { }

  ngOnInit(): void {
    this.setPanelTitle(this.title);
  }

  scroll(el: HTMLElement, $event: any) {
    console.log($event);
    this.setPanelTitle(`Modificando ${$event.nombre_producto}`);
    this.panel.open();
    el.scrollIntoView();
  }

  setPanelTitle(title: string){
    this.panelTitle = title;
  }

  refrescarTabla($event:boolean){
    if($event){
      this.productoService.getObjects().subscribe({
        next: (res: Resultado<Producto>) => this.data=res.data,
      });
    }
  }

  setMatTableDataSource(): MatTableDataSource<Producto>{
    return new MatTableDataSource<Producto>(this.data)
  }

  eventoInsertarNuevoProducto($event: boolean){
    this.setPanelTitle(this.title);
  }
}
