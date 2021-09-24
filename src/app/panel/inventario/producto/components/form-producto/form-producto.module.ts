import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormProductoRoutingModule } from './form-producto-routing.module';
import { ProductoDesignFormComponent } from './components/producto-design-form/producto-design-form.component';
import { ProductoGeneralFormComponent } from './components/producto-general-form/producto-general-form.component';
import { ProductoInventarioFormComponent } from './components/producto-inventario-form/producto-inventario-form.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { ToolsModule } from '@tools/tools.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormProductoComponent } from './form-producto.component';
import { FormProductoContainerComponent } from './components/form-producto-container/form-producto-container.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogCambiarStockComponent } from './components/dialog-cambiar-stock/dialog-cambiar-stock.component';


@NgModule({
  declarations: [
    FormProductoComponent,
    ProductoGeneralFormComponent,
    ProductoDesignFormComponent,
    ProductoInventarioFormComponent,
    FormProductoContainerComponent,
    DialogCambiarStockComponent,
  ],
  imports: [
    CommonModule,
    FormProductoRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
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
  ]
})
export class FormProductoModule { }
