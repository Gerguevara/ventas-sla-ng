import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogMessageComponent } from './components/dialog-message/dialog-message.component';
import { DialogSpinnerComponent } from './components/dialog-spinner/dialog-spinner.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [
    DialogMessageComponent,
    DialogSpinnerComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ]
})
export class ToolsModule { }
