import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from '../../../models/producto.models';
import { PaginatorService } from 'src/app/tools/services/paginator.service';

@Component({
  selector: 'app-table-producto',
  templateUrl: './table-producto.component.html',
  styleUrls: ['./table-producto.component.scss']
})
export class TableProductoComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'Nombre', 'Descripción', 'Precio'];
  dataSource!: MatTableDataSource<Producto>;
  // URL donde se consumen los datos
  url = 'http://localhost:8000/api/productos';

  constructor( private paginatorService: PaginatorService ) {
  }

  ngOnInit(): void {
    // Aquí nos subscribimos a todos los cambios que nos envíe el paginador con la data de la página
    this.paginatorService.pageDataChange$.subscribe((response: Producto[]) => {
      // Seteamos estos datos a la tabla
      this.dataSource = new MatTableDataSource<Producto>(response);
    });
  }

}
