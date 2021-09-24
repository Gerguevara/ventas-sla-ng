import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KardexRoutingModule } from './kardex-routing.module';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { LineaTransaccionComponent } from './components/linea-transaccion/linea-transaccion.component';


@NgModule({
  declarations: [
    TransaccionesComponent,
    LineaTransaccionComponent
  ],
  imports: [
    CommonModule,
    KardexRoutingModule,
  ]
})
export class KardexModule { }
