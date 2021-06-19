import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Categoria } from './../../../../core/Models/categoria.model';

@Component({
  selector: 'app-table-categoria',
  templateUrl: './table-categoria.component.html',
  styleUrls: ['./table-categoria.component.scss']
})
export class TableCategoriaComponent implements OnInit {
  @Input()
  categorias? : Categoria = undefined;

  @Output()
  detailEvent = new EventEmitter<number>();
  @Output()
  updateEvent = new EventEmitter<number>();
  @Output()
  deleteEvent = new EventEmitter<Categoria>();
  constructor() { }

  ngOnInit(): void {
  }

}
