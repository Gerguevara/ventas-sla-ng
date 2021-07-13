import { EtiquetaContainer } from './etiqueta/etiqueta.container';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:EtiquetaContainer
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtiquetaRoutingModule { }
