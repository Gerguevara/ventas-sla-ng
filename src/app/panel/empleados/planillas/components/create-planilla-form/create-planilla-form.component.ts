import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Planilla } from '@core/models/planilla.model';
import { PlanillaService } from '../../../../../core/services/planilla.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogSpinnerComponent } from '../../../../../tools/components/dialog-spinner/dialog-spinner.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'sla-create-planilla-form',
  templateUrl: './create-planilla-form.component.html',
  styleUrls: ['./create-planilla-form.component.scss']
})
export class CreatePlanillaFormComponent implements OnInit {

  createPlanillaForm!: FormGroup;
  today = new Date();

  get nombreNoValido(): boolean | undefined {
    return this.createPlanillaForm.get('nombre')?.invalid && this.createPlanillaForm.get('nombre')?.touched;
  }
  get fechaNoValido(): boolean | undefined {
    return this.createPlanillaForm.get('fecha')?.invalid && this.createPlanillaForm.get('fecha')?.touched;
  }

  constructor( private formBuilder: FormBuilder, @Inject(LOCALE_ID) public locale: string,
               private planillaService: PlanillaService,
               public dialogRef: MatDialogRef<CreatePlanillaFormComponent>,
               private dialog: MatDialog,
               private snackBar: MatSnackBar ) {
    this.createPlanillaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      fecha: [this.today, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  crearPlanilla(): void {
    const spinnerRef = this.dialog.open( DialogSpinnerComponent );
    const nombre = this.createPlanillaForm.get('nombre')?.value;
    const fecha = formatDate( this.createPlanillaForm.get('fecha')?.value, 'yyyy-MM-dd HH:mm:ss', this.locale );
    this.planillaService.crearPlanilla( nombre, fecha ).subscribe((response: Planilla) => {
      this.snackBar.open('Se ha creado una nueva planilla','Cerrar', { duration: 5000 });
      this.dialogRef.close(response);
      spinnerRef.close();
    }, (error: any) => {
      console.log(error);
      this.snackBar.open('Ah ocurrido un error!','Cerrar', { duration: 5000 });
      spinnerRef.close();
    });
  }

  getErrorNombreMessage(): string {
    if( this.createPlanillaForm.get('nombre')?.hasError('required') ) {
      return 'Este campo es requerido';
    } else {
      return '';
    }
  }

  getErrorFechaMessage(): string {
    if( this.createPlanillaForm.get('fecha')?.hasError('required') ) {
      return 'Debe ingresar una fecha';
    } else {
      return '';
    }
  }

}
