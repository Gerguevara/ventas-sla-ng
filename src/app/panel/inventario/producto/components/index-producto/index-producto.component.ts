import { Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';

import { Resultado } from '@models/resultados/resultado.model';
import { Producto } from '@models/producto.model';
import { ProductoService } from '@global-services/producto.service';
import { Router } from '@angular/router';
import { FormProductoService } from '../../../../../core/services/form-producto.service';

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
    private router: Router,
    private productoService: ProductoService,
    private formProductoService: FormProductoService
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

  mostrarProducto( $event: any ): void {
    this.formProductoService.productoMostrarSet( $event );
    this.router.navigate(['/panel/inventario/producto/mostrar']);
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
