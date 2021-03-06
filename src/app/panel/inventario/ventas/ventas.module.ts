import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { DialogVentaComponent } from './components/dialog-venta/dialog-venta.component';
import { ToolsModule } from '../../../tools/tools.module';
import { VentasIndexComponent } from './components/ventas-index/ventas-index.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { DialogEstadoOrdenComponent } from './components/dialog-estado-orden/dialog-estado-orden.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    VentasIndexComponent,
    DialogVentaComponent,
    DialogEstadoOrdenComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    ToolsModule,
    NgxMatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    VentasRoutingModule,
    MatPaginatorModule
  ]
})
export class VentasModule { }
