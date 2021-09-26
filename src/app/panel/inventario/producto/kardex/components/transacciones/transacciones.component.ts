import { Producto } from '@models/producto.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransaccionService } from '@global-services/transaccion.service';
import { Component, OnInit } from '@angular/core';
import { Transaccion } from '@models/transaccion.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductoService } from '@global-services/producto.service';

@Component({
  selector: 'sla-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss']
})
export class TransaccionesComponent implements OnInit {
  transacciones: Transaccion[]= [];
  nombreProducto: string = '';

  constructor(
    private transaccionService: TransaccionService,
    private productoService: ProductoService,
    private matSnackBar: MatSnackBar,
    private route : ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      {
        next: (response: any) => {
        this.transacciones = response.transacciones;
      }
    })
    // this.route.paramMap.subscribe(
    // {
    //   next: (params: ParamMap) => {
    //     const idObtenido = params.get('id')
    //     const id = idObtenido? Number(idObtenido) : 0;
    //     if(id){
    //       this.transaccionService.getKardex(id).subscribe(
    //         {
    //           next:
    //           (result: Transaccion[])=>{
    //             this.transacciones = result;
    //           },
    //           error:
    //           (error:any)=>{
    //             console.error(error);
    //             this.matSnackBar.open('Ocurrio un error obteniendo las transacciones', 'Cerrar', {duration:3000})
    //           }
    //         }
    //       );
    //     } else {
    //       this.matSnackBar.open('Error: id invalido', 'Cerrar', {duration:3000});
    //     }
    //   }
    // });
  }

}
