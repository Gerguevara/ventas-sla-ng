import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { IndexComponent } from './components/index/index.component';
import { DialogVentaComponent } from './components/dialog-venta/dialog-venta.component';


@NgModule({
  declarations: [
    IndexComponent,
    DialogVentaComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule
  ]
})
export class VentasModule { }
