import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-producto-inventario-form',
  templateUrl: './producto-inventario-form.component.html',
  styleUrls: ['./producto-inventario-form.component.scss']
})
export class ProductoInventarioFormComponent implements OnInit {
  @Input()
  inventarioForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }
  fontSizeControl = new FormControl(0, Validators.min(0));

}
