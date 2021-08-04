import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';

import { GestionEmpleadosRoutingModule } from './gestion-empleados-routing.module';
import { EmpleadoContainerComponent } from './empleado-container/empleado-container.component';
import { EmpleadoIndexComponent } from './components/empleado-index/empleado-index.component';
import { EmpleadoDetailComponent } from './components/empleado-detail/empleado-detail.component';
import { EmpleadoConfirmationDialogComponent } from './components/empleado-confirmation-dialog/empleado-confirmation-dialog.component';
import { EmpleadoRegisterFormComponent } from './components/empleado-register-form/empleado-register-form.component';
import { EmpleadoRegisterFormAccessComponent } from './components/empleado-register-form/empleado-register-form-access/empleado-register-form-access.component';
import { EmpleadoRegisterFormGeneralComponent } from './components/empleado-register-form/empleado-register-form-general/empleado-register-form-general.component';
import { EmpleadoRegisterFormDocumentsComponent } from './components/empleado-register-form/empleado-register-form-documents/empleado-register-form-documents.component';
import { EmpleadoRegisterFormCorporateComponent } from './components/empleado-register-form/empleado-register-form-corporate/empleado-register-form-corporate.component';
import { EmpleadoListComponent } from './components/empleado-index/empleado-list/empleado-list.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { EmpleadoDetailGeneralComponent } from './components/empleado-detail/empleado-detail-general/empleado-detail-general.component';
import { EmpleadoDetailDocumentsComponent } from './components/empleado-detail/empleado-detail-documents/empleado-detail-documents.component';
import { EmpleadoDetailCorporateComponent } from './components/empleado-detail/empleado-detail-corporate/empleado-detail-corporate.component';
import { EmpleadoDetailProfileComponent } from './components/empleado-detail/empleado-detail-profile/empleado-detail-profile.component';


@NgModule({
  declarations: [
    EmpleadoContainerComponent,
    EmpleadoIndexComponent,
    EmpleadoDetailComponent,
    EmpleadoConfirmationDialogComponent,
    EmpleadoRegisterFormComponent,
    EmpleadoRegisterFormAccessComponent,
    EmpleadoRegisterFormGeneralComponent,
    EmpleadoRegisterFormDocumentsComponent,
    EmpleadoRegisterFormCorporateComponent,
    EmpleadoListComponent,
    EmpleadoDetailGeneralComponent,
    EmpleadoDetailDocumentsComponent,
    EmpleadoDetailCorporateComponent,
    EmpleadoDetailProfileComponent
  ],
  imports: [
    CommonModule,
    GestionEmpleadosRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatTabsModule,
    MatSlideToggleModule,
    NgxPermissionsModule.forChild()
  ]
})
export class GestionEmpleadosModule { }
