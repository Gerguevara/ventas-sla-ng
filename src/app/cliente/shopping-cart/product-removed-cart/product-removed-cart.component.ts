import { Producto } from 'src/app/core/models/producto.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'sla-product-removed-cart',
  templateUrl: './product-removed-cart.component.html',
  styleUrls: ['./product-removed-cart.component.scss']
})
export class ProductRemovedCartComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public producto: Producto
  ) { }

  ngOnInit(): void {

  }

}
