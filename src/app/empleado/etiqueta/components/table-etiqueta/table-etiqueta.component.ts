import { CategoriaService } from './../../../../core/services/categoria.service';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Etiqueta } from './../../../../core/Models/etiqueta.model';
import { Categoria } from 'src/app/core/Models/categoria.model';

@Component({
  selector: 'app-table-etiqueta',
  templateUrl: './table-etiqueta.component.html',
  styleUrls: ['./table-etiqueta.component.scss']
})
export class TableEtiquetaComponent implements OnChanges {

  @Input()
  etiquetas? : Etiqueta[] = undefined;

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
    if(idCategoria!==this.idCategoriaActual)
      this.idCategoriaActual = idCategoria;
      this.categoryService.getObject(this.idCategoriaActual).subscribe({
        next:(categoria : Categoria)=>{
          this.categoriaActual = categoria.nombre;
        }
      })
    return this.categoriaActual;
  }

}
