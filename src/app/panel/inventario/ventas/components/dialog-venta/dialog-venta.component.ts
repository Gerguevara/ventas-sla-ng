import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Orden } from '@models/orden.model';
import { Producto } from '@models/producto.model';
import { DialogEstadoOrdenComponent } from '../dialog-estado-orden/dialog-estado-orden.component';
import { DialogSpinnerComponent } from '@tool-components/dialog-spinner/dialog-spinner.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VentasService } from '@global-services/ventas.service';

@Component({
  selector: 'sla-dialog-venta',
  templateUrl: './dialog-venta.component.html',
  styleUrls: ['./dialog-venta.component.scss']
})
export class DialogVentaComponent implements OnInit {

  ventaForm: FormGroup;
  listaOrdenes!: Producto[];

  constructor( private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DialogVentaComponent>,
               @Inject(MAT_DIALOG_DATA) public orden: Orden,
               private dialog: MatDialog,
               private snackBar: MatSnackBar,
               private ventasService: VentasService ) {
    this.ventaForm = this.formBuilder.group({
      nombres: [''],
      apellidos: [''],
      telefono: [''],
      direccion: ['']
    });
  }

  ngOnInit(): void {
    this.cargarDatos( this.orden );
  }

  /**
   * @ngdoc method
   * @name cargarDatos
   * @description
   * Asigna todos los datos recibidos al iniciar el componente
   * dentro del formulario
   * @params orden: Orden
   * @returns void
   */
  cargarDatos( orden: Orden ): void {
    const cliente = this.orden.cliente?.pop();
    this.ventaForm.get('nombres')?.setValue(cliente?.nombres);
    this.ventaForm.get('apellidos')?.setValue(cliente?.apellidos);
    this.ventaForm.get('direccion')?.setValue(cliente?.direccion);
    this.ventaForm.get('telefono')?.setValue(cliente?.telefono);
    if ( cliente ) {
      this.orden.cliente?.push(cliente);
    }
    this.listaOrdenes = orden.productos ? orden.productos : [];
  }

  /**
   * @ngdoc method
   * @name procesarOrden
   * @description
   * Se ejcuta cuando una orden está en estado Pendiente y se desea procesar y establecer
   * una fecha y lugar de entrega. Para ello abre el dialogo de estado de orden.
   */
  procesarOrden(): void {
    const spinnerRef = this.dialog.open( DialogSpinnerComponent );
    const dialogEstadoRef = this.dialog.open(DialogEstadoOrdenComponent, { width: '50vw', data: this.orden });
    dialogEstadoRef.afterClosed().subscribe((data: any) => {
        this.ventasService.actualizarEstadoOrden(this.orden.id, 'E', data.direccion, data.date).subscribe((orden: Orden) => {
          this.snackBar.open('El pedido está En Curso', 'Cerrar', { duration: 5000 });
          spinnerRef.close();
          this.dialogRef.close( orden );
        },
        (error: any) => {
          console.log(error);
          this.snackBar.open('Ah ocurrido un error!', 'Cerrar', { duration: 5000 });
          this.dialog.closeAll();
        });
    });
  }

}
