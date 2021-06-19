import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from '../../../models/producto.models';
import { PageEvent } from '@angular/material/paginator';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-table-producto',
  templateUrl: './table-producto.component.html',
  styleUrls: ['./table-producto.component.scss']
})
export class TableProductoComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'Nombre', 'Descripción', 'Precio'];
  dataSource!: MatTableDataSource<Producto>;
  filasSeleccionadas = new Set<Producto>();
  // URL donde se consumen los datos
  url = 'http://localhost:8000/api/productos';

  // MatPaginator Output
  pageEvent!: PageEvent;

  constructor( private productoService: ProductoService ) {
  }

  ngOnInit(): void { }

  // Obtenemos todos los cambios que nos envíe el paginador con la data de la página
  addDataToTable( event: Producto[] ): void {
    // Seteamos estos datos a la tabla
    this.dataSource = new MatTableDataSource<Producto>(event);
  }

  seleccionarProducto( row: Producto ): void {
    console.log(row);
    this.productoService.productoChange$.emit(row);
  }

}
