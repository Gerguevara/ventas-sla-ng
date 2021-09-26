import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Transaccion } from '@models/transaccion.model';

@Component({
  selector: 'sla-linea-transaccion',
  templateUrl: './linea-transaccion.component.html',
  styleUrls: ['./linea-transaccion.component.scss']
})
export class LineaTransaccionComponent implements OnInit {
  @Input()
  transaccion!: Transaccion;
  tipoEntrada!: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.tipoEntrada= this.transaccion.tipo === 'e'? true: false;
  }

}
