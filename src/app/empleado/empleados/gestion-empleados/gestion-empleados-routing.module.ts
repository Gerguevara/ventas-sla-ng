import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoRegisterFormComponent } from './components/empleado-register-form/empleado-register-form.component';
import { EmpleadoIndexComponent } from './components/empleado-index/empleado-index.component';
import { EmpleadoContainerComponent } from './empleado-container/empleado-container.component';

const routes: Routes = [
  {
    path:'',
    component:EmpleadoContainerComponent,
    children:[
      {
        path:'',
        component:EmpleadoIndexComponent
      },
      {
        path:'registro',
        component:EmpleadoRegisterFormComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionEmpleadosRoutingModule { }
