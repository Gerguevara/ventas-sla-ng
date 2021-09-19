import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '@models/producto.model';

@Component({
  selector: 'sla-dialog-cambiar-stock',
  templateUrl: './dialog-cambiar-stock.component.html',
  styleUrls: ['./dialog-cambiar-stock.component.scss']
})
export class DialogCambiarStockComponent implements OnInit {

  @ViewChild('confirmation', { read: TemplateRef }) confirmationContent!:TemplateRef<any>;
  confirmationDialogRef: any;
  cambiarStockForm!: FormGroup;

  // Valor por defecto del Select
  selected = 'e';

  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder,
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

}
