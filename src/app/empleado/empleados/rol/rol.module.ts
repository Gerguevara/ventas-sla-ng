import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RolRoutingModule } from './rol-routing.module';
import { RolFormComponent } from './components/rol-form/rol-form.component';
import { RolIndexComponent } from './components/rol-index/rol-index.component';

import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';

import { ToolsModule } from '@tools/tools.module';
import { RolesService } from '@global-services/roles.service';

@NgModule({
  declarations: [
    RolFormComponent,
    RolIndexComponent
  ],
  imports: [
    CommonModule,
    RolRoutingModule,
    ReactiveFormsModule,
    ToolsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatSnackBarModule,
    MatChipsModule
  ],
  providers: [
    RolesService
  ]
})
export class RolModule { }
