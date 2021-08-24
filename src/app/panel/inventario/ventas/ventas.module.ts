import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { DialogVentaComponent } from './components/dialog-venta/dialog-venta.component';
import { ToolsModule } from '../../../tools/tools.module';
import { VentasIndexComponent } from './components/ventas-index/ventas-index.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { VentasFilterComponent } from './components/ventas-filter/ventas-filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    VentasIndexComponent,
    DialogVentaComponent,
    VentasFilterComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ToolsModule,
    VentasRoutingModule
  ]
})
export class VentasModule { }
