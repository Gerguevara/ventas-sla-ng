import { MatTableDataSource } from '@angular/material/table';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PerfilEmpleado } from '@models/perfil.empleado.model';

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.scss']
})
export class EmpleadoListComponent implements OnChanges {
  @Output()
  viewEmpleadoEvent: EventEmitter<number> = new EventEmitter();
  @Output()
  updateEmpleadoEvent: EventEmitter<PerfilEmpleado> = new EventEmitter();
  @Output()
  removeEmpleadoEvent: EventEmitter<PerfilEmpleado> = new EventEmitter();

  @Input()
  empleados!: PerfilEmpleado[];

  dataSource: MatTableDataSource<PerfilEmpleado> = new MatTableDataSource();


  columnas = [
    'id',
    'nombres',
    'apellidos',
    'email',
    'acciones',
  ]

  constructor() {

   }

  // en cada cambio que suceda a una variable, se creara un hijo en el objeto changes
  // asi si empleados cambia, se creara un changes.empleados relacionado a el
  // este hijo tiene la estructura de un SimpleChange (en singular, diferente objeto)
  //
  //  {
  //    currentValue: <el tipo de la variable que cambio>,
  //    firstChange: boolean,
  //    previousValue: <el tipo de la variable que cambio>,
  //  }
  ngOnChanges(changes: SimpleChanges): void {
    const { empleados } = changes;
    this.dataSource.data = empleados.currentValue;

  }

}
