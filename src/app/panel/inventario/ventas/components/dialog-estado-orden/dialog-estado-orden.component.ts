import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Orden } from '@core/Models/orden.model';
import { DialogSpinnerComponent } from '../../../../../tools/components/dialog-spinner/dialog-spinner.component';
import { VentasService } from '../../../../../core/services/ventas.service';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'sla-dialog-estado-orden',
  templateUrl: './dialog-estado-orden.component.html',
  styleUrls: ['./dialog-estado-orden.component.scss']
})
export class DialogEstadoOrdenComponent implements OnInit {

  // Parámetros para el DateTimePicker
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = true;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public dateControl = new FormControl();

  estadoOrdenForm!: FormGroup;

  constructor( private formBuilder: FormBuilder,
               private dialog: MatDialog,
               private snackBar: MatSnackBar,
               private ventasSerivce: VentasService,
               public dialogRef: MatDialogRef<DialogEstadoOrdenComponent>,
               @Inject(LOCALE_ID) public locale: string,
               @Inject(MAT_DIALOG_DATA) public orden: Orden, ) {
    this.estadoOrdenForm = this.formBuilder.group({
      fechaHora: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.estadoOrdenForm.get('fechaHora')?.setValue(new Date());
    if ( this.orden ) {
      const cliente = this.orden.cliente?.pop();
      this.estadoOrdenForm.get('direccion')?.setValue( cliente?.direccion );
    }
  }

  procesarOrden(): void {
    const ref = this.dialog.open( DialogSpinnerComponent );
    const direccion = this.estadoOrdenForm.get('direccion')?.value;
    const date = formatDate( this.estadoOrdenForm.get('fechaHora')?.value, 'yyyy-MM-dd HH:mm:ss', this.locale );
    this.ventasSerivce.actualizarEstadoOrden(this.orden.id, 'E', direccion, date).subscribe((orden: Orden) => {
      this.snackBar.open('El pedido está En Curso', 'Cerrar', { duration: 5000 });
      this.dialogRef.close( orden );
      ref.close();
    },
    (error: any) => {
      console.log(error);
      this.snackBar.open('Ah ocurrido un error!', 'Cerrar', { duration: 5000 });
      this.dialog.closeAll();
    });
  }

}
