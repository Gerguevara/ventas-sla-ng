import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { Producto } from '@models/producto.model';
import { ProductoService } from '@global-services/producto.service';
import { environment } from '@environments/environment';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-index-product-card',
  templateUrl: './index-product-card.component.html',
  styleUrls: ['./index-product-card.component.scss']
})
export class IndexProductCardComponent implements OnInit {
  @Input()
  productoInput! : Producto;
  @ViewChild('main')
  mainCard!: ElementRef;
  @Output()
  imageLoaded!: EventEmitter<IndexProductCardComponent>;
  hasImage: boolean;
  placeholderProductImage: string = environment.defaultProductImage;

  constructor(
    private productoService: ProductoService
    ) {
    this.hasImage=false;
  }


  public getWidth(){
    this.mainCard.nativeElement.width;
  }

  public getHeight(){
    this.mainCard.nativeElement.height;
  }

  ngOnInit(): void {
    this.checkImageStatus();
  }

  checkImageStatus(){
    this.productoService.getImage(this.productoInput).subscribe({
      next: (response:any)=> {
        this.hasImage=true;
      },
      error: ()=> {this.hasImage=false;},
      complete: ()=> {
        this.imageLoaded.emit(this);
      }
    })
  }
}
