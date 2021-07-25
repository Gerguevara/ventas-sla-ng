import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Etiqueta } from 'src/app/core/Models/etiqueta.model';
import { Categoria } from 'src/app/core/Models/categoria.model';
import { CategoriaService } from 'src/app/core/services/categoria.service';

@Component({
  selector: 'app-table-etiqueta',
  templateUrl: './table-etiqueta.component.html',
  styleUrls: ['./table-etiqueta.component.scss']
})
export class TableEtiquetaComponent implements OnChanges {

  @Input()
  etiquetas? : Etiqueta[] = undefined;
  @Input()
  categorias? : Categoria[] = undefined;

  @Output()
  detailEvent = new EventEmitter<number>();
  @Output()
  updateEvent = new EventEmitter<number>();
  @Output()
  deleteEvent = new EventEmitter<Etiqueta>();

  categoriaActual : string = "";
  idCategoriaActual : number = -1;

  columnas = [
    'id',
    'categoria',
    'nombre',
    'acciones'
  ]
  dataSource : MatTableDataSource<Etiqueta> = new MatTableDataSource();

  constructor(private categoryService : CategoriaService) { }

  ngOnChanges(cambios : SimpleChanges): void {
    const etiquetas = cambios.etiquetas; //const { etiquetas } = cambios;
    if(etiquetas)
      this.dataSource.data = etiquetas.currentValue;
  }

  getCategoria(idCategoria : number) : string{
    let catAux = this.categorias?.find((cat : Categoria) => cat.id ===idCategoria)
    return (catAux ? catAux.nombre : "");
  }

  detailAction($event: MouseEvent, row: Etiqueta){
    const element = $event.target as HTMLElement;
    if(!element.classList.contains('mat-icon') && !element.classList.contains('mat-icon-button'))
      this.detailEvent.emit(row.id);
  }

}
