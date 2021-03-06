import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Producto } from '@models/producto.model';
import { ProductoService } from '../../../../../../../core/services/producto.service';

@Component({
  selector: 'app-producto-inventario-form',
  templateUrl: './producto-inventario-form.component.html',
  styleUrls: ['./producto-inventario-form.component.scss']
})
export class ProductoInventarioFormComponent implements OnInit, OnDestroy {

  inventarioForm!: FormGroup;
  fontSizeControl = new FormControl(0, Validators.min(0));
  estado = '1';
  cantidad = '0';
  // Salida del formulario de datos
  @Output() inventarioFormOutput$ = new EventEmitter<FormGroup>();
  @Output() submitFormFlag$ = new EventEmitter<Boolean>();

  constructor(private formBuilder: FormBuilder,
              private productoService: ProductoService) {
    // Formulario de inventario
    this.inventarioForm = this.formBuilder.group({
      estado     : [this.estado, [Validators.required]],
      cantidad   : [{ value: this.cantidad, disabled: true }, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.inventarioFormOutput$.emit(this.inventarioForm);
  }

  ngOnInit(): void {
    if ( this.productoService.productoChange ) {
      this.cargarData( this.productoService.productoChange );
    }
  }

  cargarData( data: Producto ): void {
    this.inventarioForm.get('estado')?.setValue(data.disponibilidad.toString());
    this.inventarioForm.get('cantidad')?.setValue(data.cantidad);
  }

  submitInventarioForm(): void {
    this.inventarioFormOutput$.emit(this.inventarioForm);
    this.submitFormFlag$.emit(true);
  }

}
