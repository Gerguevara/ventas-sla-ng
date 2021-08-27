import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Orden } from '../../../../../core/Models/orden.model';

@Component({
  selector: 'sla-dialog-venta',
  templateUrl: './dialog-venta.component.html',
  styleUrls: ['./dialog-venta.component.scss']
})
export class DialogVentaComponent implements OnInit {

  ventaForm: FormGroup;

  constructor( private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DialogVentaComponent>,
               @Inject(MAT_DIALOG_DATA) public orden: Orden ) {
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
    const cliente = orden.cliente?.pop();
    this.ventaForm.get('nombres')?.setValue(cliente?.nombres);
    this.ventaForm.get('apellidos')?.setValue(cliente?.apellidos);
    this.ventaForm.get('direccion')?.setValue(cliente?.direccion);
    this.ventaForm.get('telefono')?.setValue(cliente?.telefono);
  }

}
