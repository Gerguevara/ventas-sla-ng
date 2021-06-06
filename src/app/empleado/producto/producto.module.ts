import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormProductoComponent } from './components/form-producto/form-producto.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    FormProductoComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule
  ]
})
export class ProductoModule { }
