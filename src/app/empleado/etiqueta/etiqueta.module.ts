import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtiquetaRoutingModule } from './etiqueta-routing.module';
import { EtiquetaContainer } from './etiqueta/etiqueta.container';
import { DetailEtiquetaComponent } from './components/detail-etiqueta/detail-etiqueta.component';
import { DeleteEtiquetaComponent } from './components/delete-etiqueta/delete-etiqueta.component';
import { FormEtiquetaComponent } from './components/form-etiqueta/form-etiqueta.component';
import { TableEtiquetaComponent } from './components/table-etiqueta/table-etiqueta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule} from '@angular/material/autocomplete'


@NgModule({
  declarations: [
    EtiquetaContainer,
    DetailEtiquetaComponent,
    DeleteEtiquetaComponent,
    FormEtiquetaComponent,
    TableEtiquetaComponent
  ],
  imports: [
    CommonModule,
    EtiquetaRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule
  ]
})
export class EtiquetaModule { }
