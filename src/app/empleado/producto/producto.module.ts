import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProductoRoutingModule } from './producto-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormProductoComponent } from './components/form-producto/form-producto.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { TableProductoComponent } from './components/table-producto/table-producto.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductoService } from './services/producto.service';
import { ToolsModule } from 'src/app/tools/tools.module';
import { PaginatorService } from '../../tools/services/paginator.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { IndexProductoComponent } from './components/index-producto/index-producto.component';

@NgModule({
  declarations: [
    FormProductoComponent,
    TableProductoComponent,
    IndexProductoComponent,
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
    MatSelectModule,
    NgxMatFileInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    ToolsModule,
    MatSnackBarModule,
    MatChipsModule
  ],
  providers: [
    ProductoService,
    PaginatorService
  ]
})
export class ProductoModule { }
