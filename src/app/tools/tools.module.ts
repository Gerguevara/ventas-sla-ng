import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogMessageComponent } from './components/dialog-message/dialog-message.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { DialogSpinnerComponent } from './components/dialog-spinner/dialog-spinner.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    DialogSpinnerComponent,
    DialogMessageComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ]
})
export class ToolsModule { }
