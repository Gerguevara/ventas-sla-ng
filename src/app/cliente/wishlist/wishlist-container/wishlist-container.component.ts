import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Producto } from '@models/producto.model';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'sla-wishlist-container',
  templateUrl: './wishlist-container.component.html',
  styleUrls: ['./wishlist-container.component.scss']
})
export class WishlistContainerComponent implements OnInit {
  productos: Producto[] = [];

  constructor(
    private matSnackBar: MatSnackBar,
    private route: ActivatedRoute,
    ) {
    this.route.data.subscribe(
      {
        next: (response: Data) => {
          this.productos = response.wishlist;
      }
    })
  }

  ngOnInit(): void {
    this.route
  }

  handleDelete(id: number){
    this.productos = this.productos.filter((value:Producto)=>{return value.id!==id})
    this.matSnackBar.open('Producto retirado de la lista de deseos', 'Cerrar', {duration:3000})
  }

}
