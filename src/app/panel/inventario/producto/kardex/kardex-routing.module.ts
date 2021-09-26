import { TransaccionService } from '@global-services/transaccion.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';

const routes: Routes = [
  {
    path: ':id',
    component: TransaccionesComponent,
    resolve: {
      transacciones: TransaccionService,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KardexRoutingModule { }
