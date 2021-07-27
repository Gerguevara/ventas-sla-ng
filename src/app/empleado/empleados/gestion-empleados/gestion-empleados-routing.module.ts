import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoContainerComponent } from './empleado-container/empleado-container.component';

const routes: Routes = [
  {
    path:'registrar',
    component:EmpleadoContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionEmpleadosRoutingModule { }
