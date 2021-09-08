import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '@models/producto.model';
import { ProductoService } from '../../../../../../../core/services/producto.service';

@Component({
  selector: 'app-producto-inventario-form',
  templateUrl: './producto-inventario-form.component.html',
  styleUrls: ['./producto-inventario-form.component.scss']
})
export class ProductoInventarioFormComponent implements OnInit {

  inventarioForm!: FormGroup;
  fontSizeControl = new FormControl(0, Validators.min(0));
  estado = '1';
  cantidad = '0';

  constructor(private formBuilder: FormBuilder,
              private productoService: ProductoService) {
    // Formulario de inventario
    this.inventarioForm = this.formBuilder.group({
      estado     : [this.estado, [Validators.required]],
      cantidad   : [this.cantidad, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.cargarData( this.productoService.productoChange );
  }

  cargarData( data: Producto ): void {
    this.inventarioForm.get('estado')?.setValue(data.disponibilidad.toString());
    this.inventarioForm.get('cantidad')?.setValue(data.cantidad);
  }

}
