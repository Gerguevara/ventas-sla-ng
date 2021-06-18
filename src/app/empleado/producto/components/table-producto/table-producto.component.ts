import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from '../../../models/producto.models';
import { PaginatorService } from 'src/app/tools/services/paginator.service';
import { PaginatorResponse } from 'src/app/empleado/models/paginator.model';
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

  // Inputs para paginacion
  configPaginator!: PaginatorResponse;
  pageSizeOptions!: number[];
  length!: number;
  pageSize!: number;

  // MatPaginator Output
  pageEvent!: PageEvent;

  @ViewChild('alertContainer', { read: ViewContainerRef }) container: any;

  constructor( private productoService: ProductoService ) {
  }

  ngOnInit(): void {
    // Aquí nos subscribimos a todos los cambios que nos envíe el paginador con la data de la página
    // this.paginatorService.pageDataChange$.subscribe((response: Producto[]) => {
      // Seteamos estos datos a la tabla
      // this.dataSource = new MatTableDataSource<Producto>(response);
    // });
    this.productoService.getAllData( this.url, 5 ).then((response: PaginatorResponse) => {
      this.configPaginator = response;
      // Establecemos los valores de las variables con los datos de la Input
      this.pageSizeOptions = [ 5, 10, 15, 20 ];
      this.length = this.configPaginator.total;
      this.pageSize = Number(this.configPaginator.per_page);
      this.dataSource = new MatTableDataSource<Producto>(response.data);
    });
  }

  seleccionarProducto( row: Producto ): void {
    console.log(row);
    this.productoService.productoChange$.emit(row);
  }

  changePageEvent( event: any ): void{
    // Cuando el usuario cambia de página o el numero de items por pagina se dispara este método
    // Aquí llamamos directamente al servicio para obtener los datos según la acción que el usuario realizó
    this.productoService.getPageData( this.configPaginator.links[ event.pageIndex + 1 ].url, event.pageSize )
    .then((response: PaginatorResponse) => {
      // Seteamos la nueva configuración
      this.configPaginator = response;
      // Establecemos los valores de las variables con los datos de la respuesta
      this.pageSizeOptions = [ 5, 10, 15, 20 ];
      this.length = this.configPaginator.total;
      this.pageSize = Number(this.configPaginator.per_page);
      this.dataSource = new MatTableDataSource<Producto>(response.data);
    });
    // Guardamos el nuevo estado del evento
    this.pageEvent = event;
  }

}
