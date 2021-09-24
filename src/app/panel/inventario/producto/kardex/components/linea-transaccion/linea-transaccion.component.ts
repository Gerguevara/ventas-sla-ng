import { Component, Input, OnInit } from '@angular/core';
import { Transaccion } from '@models/transaccion.model';

@Component({
  selector: 'sla-linea-transaccion',
  templateUrl: './linea-transaccion.component.html',
  styleUrls: ['./linea-transaccion.component.scss']
})
export class LineaTransaccionComponent implements OnInit {
  @Input()
  transaccion!: Transaccion;

  constructor() { }

  ngOnInit(): void {
  }

}
