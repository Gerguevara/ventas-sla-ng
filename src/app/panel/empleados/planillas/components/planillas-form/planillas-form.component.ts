import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LineaPlanilla } from '@core/Models/linea.planilla.model';
import { PlanillaService } from '../../../../../core/services/planilla.service';
import { DialogSpinnerComponent } from '../../../../../tools/components/dialog-spinner/dialog-spinner.component';

@Component({
  selector: 'app-planillas-form',
  templateUrl: './planillas-form.component.html',
  styleUrls: ['./planillas-form.component.scss']
})
export class PlanillasFormComponent implements OnInit {

  lineaPlanillaForm: FormGroup;
  habilitarEditar = true;

  constructor( public dialogRef: MatDialogRef<PlanillasFormComponent>,
               @Inject(MAT_DIALOG_DATA) public planilla: LineaPlanilla,
               private formBuilder: FormBuilder,
               private dialog: MatDialog,
               private snackBar: MatSnackBar,
               private planillaService: PlanillaService ) {
                 this.lineaPlanillaForm = this.formBuilder.group({
                  id: [],
                  id_empleado: [],
                  comisiones: [0.00, [Validators.required]],
                  horas_extra_diurnas: [0, [Validators.required]],
                  valor_horas_extra_diurnas: [0.00, [Validators.required]],
                  horas_extra_nocturnas: [0, [Validators.required]],
                  valor_horas_extra_nocturnas: [0.00, [Validators.required]],
                  horas_extra_domingo: [0, [Validators.required]],
                  valor_horas_extra_domingo: [0.00, [Validators.required]],
                  total_horas_extras: [0.00, [Validators.required]],
                  otros_ingresos: [0.00, [Validators.required]],
                  total_ingresos: [0.00, [Validators.required]],
                  isss: [0.00, [Validators.required]],
                  afp: [0.00, [Validators.required]],
                  otras_deducciones: [0.00, [Validators.required]],
                  total_descuentos: [0.00, [Validators.required]],
                  renta: [0.00, [Validators.required]],
                  a_recibir: [0.00, [Validators.required]],
                 });
               }

  ngOnInit(): void {
    if ( this.planilla ) {
      this.lineaPlanillaForm.disable();
      this.cargarDatos( this.planilla );
    }
  }

  cargarDatos( planilla: LineaPlanilla ): void {
    this.lineaPlanillaForm.get('id')?.setValue(planilla.id);
    this.lineaPlanillaForm.get('id_empleado')?.setValue(planilla.id_empleado);
    this.lineaPlanillaForm.get('comisiones')?.setValue(planilla.comisiones);
    this.lineaPlanillaForm.get('horas_extra_diurnas')?.setValue(planilla.horas_extra_diurnas);
    this.lineaPlanillaForm.get('valor_horas_extra_diurnas')?.setValue(planilla.valor_horas_extra_diurnas);
    this.lineaPlanillaForm.get('horas_extra_nocturnas')?.setValue(planilla.horas_extra_nocturnas);
    this.lineaPlanillaForm.get('valor_horas_extra_nocturnas')?.setValue(planilla.valor_horas_extra_nocturnas);
    this.lineaPlanillaForm.get('horas_extra_domingo')?.setValue(planilla.horas_extra_domingo);
    this.lineaPlanillaForm.get('valor_horas_extra_domingo')?.setValue(planilla.valor_horas_extra_domingo);
    this.lineaPlanillaForm.get('total_horas_extras')?.setValue(planilla.total_horas_extras);
    this.lineaPlanillaForm.get('otros_ingresos')?.setValue(planilla.otros_ingresos);
    this.lineaPlanillaForm.get('total_ingresos')?.setValue(planilla.total_ingresos);
    this.lineaPlanillaForm.get('isss')?.setValue(planilla.isss);
    this.lineaPlanillaForm.get('afp')?.setValue(planilla.afp);
    this.lineaPlanillaForm.get('otras_deducciones')?.setValue(planilla.otras_deducciones);
    this.lineaPlanillaForm.get('total_descuentos')?.setValue(planilla.total_descuentos);
    this.lineaPlanillaForm.get('renta')?.setValue(planilla.renta);
    this.lineaPlanillaForm.get('a_recibir')?.setValue(planilla.a_recibir);
  }

  editarFormulario(): void {
    this.habilitarEditar = false;
    this.lineaPlanillaForm.enable();
  }

  actualizarLineaPlanilla(): void {
    const spinner = this.dialog.open( DialogSpinnerComponent );
    console.log(this.lineaPlanillaForm.value);
    this.planillaService.actualizarLineaPlanilla( this.lineaPlanillaForm.value as LineaPlanilla )
    .subscribe((response: any) => {
      console.log(response);
      this.snackBar.open( 'Planilla actualizada correctamente', 'Cerrar', { duration: 5000 } );
      spinner.close();
      this.dialogRef.close();
    },
    (error: any) => {
      console.log(error);
      this.snackBar.open( 'Ha ocurrido un error!', 'Cerrar', { duration: 5000 } );
      spinner.close();
      this.dialogRef.close();
    });
  }

}
