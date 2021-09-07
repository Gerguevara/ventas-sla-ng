import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Producto } from '@models/producto.model';
import { IndexService } from '@global-services/index.service';
import { CarritoService } from '@global-services/carrito.service';

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.container.html',
  styleUrls: ['./index-producto.container.scss']
})
export class IndexProductoContainer implements OnInit {
  producto? : Producto;
  isInCart!: boolean;
  constructor(
    private route : ActivatedRoute,
    private indexService : IndexService,
    private carritoService: CarritoService,
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
    {
      next: (params: ParamMap) => {
        let idObtenido = params.get('id')
        let id = 0;
        if(idObtenido) id = Number(idObtenido);
        this.indexService.getObject(id).subscribe({
          next:(producto:Producto)=>{
            this.producto = producto;
            this.isInCart = this.carritoService.estaEnCarrito(producto);
          }
        })
      },
    }
    );
  }

  shoppingCartHandler($event: any){
    const product = this.producto? this.producto: {} as Producto;
    if(!this.isInCart){
      this.carritoService.agregar(product);
      this.isInCart = true;
    }
    else{
      this.carritoService.eliminar(product);
      this.isInCart = false;
    }
  }

}
