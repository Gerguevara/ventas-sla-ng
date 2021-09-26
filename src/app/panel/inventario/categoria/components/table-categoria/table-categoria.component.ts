import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Categoria } from '@models/categoria.model';

@Component({
  selector: 'app-table-categoria',
  templateUrl: './table-categoria.component.html',
  styleUrls: ['./table-categoria.component.scss']
})
export class TableCategoriaComponent implements OnChanges {
  @Input()
  categorias? : Categoria[] = undefined;

  @Output()
  detailEvent = new EventEmitter<number>();
  @Output()
  updateEvent = new EventEmitter<number>();
  @Output()
  deleteEvent = new EventEmitter<Categoria>();

  columnas = [
    'id',
    'nombre',
    'descripcion',
    'acciones'
  ]

  dataSource : MatTableDataSource<Categoria> = new MatTableDataSource();
  constructor() { }

  ngOnChanges(cambios : SimpleChanges): void {
    const categorias = cambios.categorias; //const { categorias } = cambios;
    if(categorias)
      this.dataSource.data = categorias.currentValue;
  }

  detailAction($event: MouseEvent, row: Categoria){
    const element = $event.target as HTMLElement;
    if(!element.classList.contains('mat-icon'))
      this.detailEvent.emit(row.id);
  }
}
