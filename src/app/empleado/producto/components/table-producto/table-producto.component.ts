import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../../models/producto.models';
import { PaginatorResponse } from 'src/app/empleado/models/paginator.model';

@Component({
  selector: 'app-table-producto',
  templateUrl: './table-producto.component.html',
  styleUrls: ['./table-producto.component.scss']
})
export class TableProductoComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'Nombre', 'Descripción', 'Precio'];
  dataSource!: MatTableDataSource<Producto>;
  configPaginator!: PaginatorResponse;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor( private productoService: ProductoService ) {
    this.productoService.getAllProducts(5).subscribe((response: PaginatorResponse) => {
      this.configPaginator = response;
      this.dataSource = new MatTableDataSource<Producto>(response.data);
    });
  }

  ngOnInit(): void {
  }

  /*ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }*/

}
