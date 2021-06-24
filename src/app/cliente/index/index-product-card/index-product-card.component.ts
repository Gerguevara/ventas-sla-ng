import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/core/Models/producto.model';

@Component({
  selector: 'app-index-product-card',
  templateUrl: './index-product-card.component.html',
  styleUrls: ['./index-product-card.component.scss']
})
export class IndexProductCardComponent implements OnInit {
  @Input()
  productoInput? : Producto;

  constructor() { 
  }

  ngOnInit(): void {
  }

}
