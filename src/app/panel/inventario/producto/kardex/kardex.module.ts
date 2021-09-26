import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KardexRoutingModule } from './kardex-routing.module';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { LineaTransaccionComponent } from './components/linea-transaccion/linea-transaccion.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    TransaccionesComponent,
    LineaTransaccionComponent,
  ],
  imports: [
    CommonModule,
    KardexRoutingModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
  ]
})
export class KardexModule { }
