import { CarritoService } from './../../../core/services/carrito.service';
import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { Producto } from 'src/app/core/models/producto.model';
import { ProductoService } from '@global-services/producto.service';
import { environment } from '@environments/environment';
import { MatCard } from '@angular/material/card';
import { FormControl, Validators } from '@angular/forms';

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
  calificacionProducto!: number;
  placeholderProductImage: string = environment.defaultProductImage;
  isInCart!: boolean;
  cantidadControl = new FormControl(1, [
    Validators.required
  ]);

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService
    ) {
    this.hasImage=false;
    this.calificacionProducto =0;
  }


  public getWidth(){
    this.mainCard.nativeElement.width;
  }

  public getHeight(){
    this.mainCard.nativeElement.height;
  }

  ngOnInit(): void {
    this.checkImageStatus();
    this.calificacionProducto = Number(this.productoInput.calificacion_promedio);
    this.isInCart = this.carritoService.estaEnCarrito(this.productoInput);
    if(this.isInCart){
      this.cantidadControl.setValue(this.carritoService.obtenerCantidad(this.productoInput));
      this.cantidadControl.disable();
    }
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

  shoppingCartHandler($event:MouseEvent){
    console.log($event);
    $event.preventDefault();$event.stopPropagation();
    //logica de agregar producto al carrito
    if(!this.isInCart){
      this.carritoService.agregar(this.productoInput, this.cantidadControl.value);
      this.isInCart = true;
      this.cantidadControl.disable();
    }
    else{
      this.carritoService.eliminar(this.productoInput);
      this.isInCart = false;
      this.cantidadControl.enable();
    }
  }
}
