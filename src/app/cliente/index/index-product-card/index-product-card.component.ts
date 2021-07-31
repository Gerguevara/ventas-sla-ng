import { environment } from '@environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from '@global-services/producto.service';
import { Producto } from '@models/producto.model';

@Component({
  selector: 'app-index-product-card',
  templateUrl: './index-product-card.component.html',
  styleUrls: ['./index-product-card.component.scss']
})
export class IndexProductCardComponent implements OnInit {
  @Input()
  productoInput! : Producto;
  hasImage: boolean;
  placeholderProductImage: string = environment.defaultProductImage;

  constructor(
    private productoService: ProductoService
    ) {
    this.hasImage=false;
  }

  ngOnInit(): void {
    this.checkImageStatus();
  }

  checkImageStatus(){
    this.productoService.getImage(this.productoInput).subscribe({
      next: (response:any)=> {
        this.hasImage=true;
      },
      error: ()=> {this.hasImage=false;}
    })
  }
}
