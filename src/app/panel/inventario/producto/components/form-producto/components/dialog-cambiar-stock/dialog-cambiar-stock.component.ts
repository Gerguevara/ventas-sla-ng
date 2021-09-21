import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '@models/producto.model';
import { ProductoService } from '../../../../../../../core/services/producto.service';
import { DialogSpinnerComponent } from '../../../../../../../tools/components/dialog-spinner/dialog-spinner.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'sla-dialog-cambiar-stock',
  templateUrl: './dialog-cambiar-stock.component.html',
  styleUrls: ['./dialog-cambiar-stock.component.scss']
})
export class DialogCambiarStockComponent implements OnInit {

  @ViewChild('confirmation', { read: TemplateRef }) confirmationContent!: TemplateRef<any>;
  confirmationDialogRef: any;
  cambiarStockForm!: FormGroup;

  // Valor por defecto del Select
  selected = 'e';

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private productoService: ProductoService,
              @Inject(MAT_DIALOG_DATA) public data: Producto ) {
                this.cambiarStockForm = this.formBuilder.group({
                  tipo: ['e', Validators.required],
                  cantidad: [1, Validators.required]
                });
              }

  ngOnInit(): void { }

  abrirConfirmarDialog(): void {
    this.confirmationDialogRef = this.dialog.open(this.confirmationContent);
  }

  cerrarConfirmarDialog(): void {
    this.confirmationDialogRef.close();
  }

  /**
   * @ngdoc method
   * @name confirmarCambioStock
   * @description
   * Es ejecutado cuando el usuario confirma estar seguro de realizar los cambios de stock ingresados
   * en el formulario. Realiza el post a la API con la información ingresada por el usuario para el
   * cambio de stock.
   * @returns void
   */
  confirmarCambioStock(): void {
    const spinnerRef = this.dialog.open( DialogSpinnerComponent );
    const concepto = this.cambiarStockForm.get('tipo')?.value;
    const cantidad = this.cambiarStockForm.get('cantidad')?.value;
    this.productoService.cambiarStockProducto(this.data.id, concepto, cantidad, this.data.precio).subscribe(
      (response: any) => {
        if ( response.mensaje ) {
          this.snackBar.open(response.mensaje, 'Cerrar', { duration: 5000 });
          spinnerRef.close();
          this.cerrarConfirmarDialog();
        } else {
          this.snackBar.open('Los cambios se han guardado correctamente', 'Cerrar', { duration: 5000 });
          spinnerRef.close();
          this.cerrarConfirmarDialog();
        }
      }
    );
  }

}
