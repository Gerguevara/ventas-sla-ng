import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolFormComponent } from './components/rol-form/rol-form.component';
import { RolIndexComponent } from './components/rol-index/rol-index.component';

const routes: Routes = [
  { path: 'index', component: RolIndexComponent },
  { path: 'form', component: RolFormComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'index' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolRoutingModule { }
