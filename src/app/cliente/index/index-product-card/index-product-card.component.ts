import { environment } from 'src/environments/environment';
import { ProductoService } from 'src/app/core/services/producto.service';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/core/Models/producto.model';

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
