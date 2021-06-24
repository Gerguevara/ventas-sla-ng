import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from 'src/app/core/Models/categoria.model';
import { Producto } from 'src/app/core/Models/producto.model';
import { Resultado } from 'src/app/core/Models/resultado.model';
import { ProductoService } from 'src/app/core/services/producto.service';

@Component({
  selector: 'app-index-table',
  templateUrl: './index-table.component.html',
  styleUrls: ['./index-table.component.scss']
})
export class IndexTableComponent implements OnInit {
  @Input()
  categoriaId : number = -1;
  productos : Producto[] = [];
  maxProductos : number = 4;
  constructor(private productoService : ProductoService) { }

  ngOnInit(): void {
    this.productoService.obtenerListaProductos().subscribe({
      next: (res : Resultado<Producto>)=>{
        this.productos = res.data.filter((prod:Producto)=>prod.id_categoria===this.categoriaId)
        this.productos=this.productos.sort(this.comparador);
        if(this.productos.length > this.maxProductos)
          this.productos = this.productos.slice(0,this.maxProductos);
      }
    })
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
