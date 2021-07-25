import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/core/Models/producto.model';
import { ProductoService } from 'src/app/core/services/producto.service';
import { DialogEliminarProductoComponent } from '../dialog-eliminar-producto/dialog-eliminar-producto.component';
import { environment } from 'src/environments/environment';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-table-producto',
  templateUrl: './table-producto.component.html',
  styleUrls: ['./table-producto.component.scss']
})
export class TableProductoComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'Nombre', 'Descripción', 'Precio', 'Acciones'];
  dataSource!: MatTableDataSource<Producto>;
  filasSeleccionadas = new Set<Producto>();

  @Input() disponibilidad = 1;
  @Output()
  clickTabla = new EventEmitter();

  private endpoint : string = "productos";
  // URL donde se consumen los datos
  url = `${environment.apiUrl}${this.endpoint}`;
  params = '&status=' + this.disponibilidad;

  // MatPaginator Output
  pageEvent!: PageEvent;

  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog,
    private permissions: NgxPermissionsService
  ) { }

  ngOnInit(): void { }

  // Obtenemos todos los cambios que nos envíe el paginador con la data de la página
  addDataToTable( event: Producto[] ): void {
    // Seteamos estos datos a la tabla
    this.dataSource = new MatTableDataSource<Producto>(event);
  }

  seleccionarProducto( row: Producto): void {
    this.permissions.hasPermission('productos.show').then((response: boolean) => {
      if (response) {
        this.clickTabla.emit();
        this.productoService.productoChange$.emit(row);
      }
    });
  }

  quitarProducto( element: Producto ): void {
    // Cerramos todos los dialogos abiertos hasta el momento
    this.dialog.closeAll();
    // Abrimos el nuevo dialogo con el mensaje
    this.dialog.open( DialogEliminarProductoComponent, { data: element } );
  }

}
