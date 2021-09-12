import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductoRoutingModule } from './producto-routing.module';
import { TableProductoComponent } from './components/table-producto/table-producto.component';
import { IndexProductoComponent } from './components/index-producto/index-producto.component';
import { DialogEliminarProductoComponent } from './components/dialog-eliminar-producto/dialog-eliminar-producto.component';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { NgxPermissionsModule } from 'ngx-permissions';

import { ToolsModule } from '@tools/tools.module';
import { PaginatorService } from '@tool-services/paginator.service';
import { ProductoService } from '@global-services/producto.service';

@NgModule({
  declarations: [
    TableProductoComponent,
    IndexProductoComponent,
    DialogEliminarProductoComponent,
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
    MatChipsModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    NgxPermissionsModule.forChild()
  ],
  providers: [
    ProductoService,
    PaginatorService
  ]
})
export class ProductoModule { }
