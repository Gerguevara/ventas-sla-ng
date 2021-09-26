import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Producto } from 'src/app/core/models/producto.model';
import { ProductoService } from '@global-services/producto.service';

import { DialogMessageComponent } from '@tool-components/dialog-message/dialog-message.component';
import { DialogSpinnerComponent } from '@tool-components/dialog-spinner/dialog-spinner.component';

@Component({
  selector: 'app-dialog-eliminar-producto',
  templateUrl: './dialog-eliminar-producto.component.html',
  styleUrls: ['./dialog-eliminar-producto.component.scss']
})
export class DialogEliminarProductoComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogEliminarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    private productoService: ProductoService,
    private dialog: MatDialog ) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  eliminar(): void {
    this.dialog.open( DialogSpinnerComponent );
    this.productoService.eliminarProducto( this.data ).subscribe((response: any) => {
      // Cerramos todos los dialogos abiertos hasta el momento
      this.dialog.closeAll();
      // Abrimos el nuevo dialogo con el mensaje
      const mensaje = response.mensaje;
      this.dialog.open( DialogMessageComponent,
                      { data: {
                          title: 'Elimiar Producto',
                          message: mensaje,
                          redirect: '/panel/index'
                        } } );
    },
    (error: any) => {
      // Cerramos todos los dialogos abiertos hasta el momento
      this.dialog.closeAll();
      // Abrimos el nuevo dialogo con el mensaje
      const mensaje = 'Ha ocurrido un error!';
      this.dialog.open( DialogMessageComponent,
                      { data: {
                          title: 'Elimiar Producto',
                          message: mensaje,
                          redirect: '/panel/index'
                        } } );
    });
  }

}
