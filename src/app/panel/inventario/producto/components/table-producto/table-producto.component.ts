import { Component, Input, OnInit, EventEmitter, Output, Inject, LOCALE_ID, AfterViewInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { Producto } from 'src/app/core/models/producto.model';
import { ProductoService } from '@global-services/producto.service';

import { DialogEliminarProductoComponent } from '../dialog-eliminar-producto/dialog-eliminar-producto.component';
import { environment } from '@environments/environment';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-producto',
  templateUrl: './table-producto.component.html',
  styleUrls: ['./table-producto.component.scss']
})
export class TableProductoComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['ID', 'Nombre', 'Descripción', 'Precio', 'Acciones'];

  dataSource!: MatTableDataSource<Producto>;
  filasSeleccionadas = new Set<Producto>();

  @Input() disponibilidad = 1;
  @Output()
  clickTabla = new EventEmitter();

  // Rango de fechas del datepicker
  filtro = new FormGroup({
    valorBusqueda: new FormControl(''),
  });

  get valorBusquedaControl(): AbstractControl {
    return this.filtro.get('valorBusqueda') as AbstractControl;
  }

  private endpoint = 'productos';
  // URL donde se consumen los datos
  url = `${environment.apiUrl}${this.endpoint}`;
  params = '&status=' + this.disponibilidad;

  // Observable para manejar paginación
  inputParams$: Subject<string> = new Subject<string>();

  selected = '';

  // MatPaginator Output
  pageEvent!: PageEvent;

  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog,
    private permissions: NgxPermissionsService,
    private router: Router,
    @Inject(LOCALE_ID) public locale: string
  ) { }

  ngOnInit(): void {
    if ( this.valorBusquedaControl ) {
      this.valorBusquedaControl.valueChanges.pipe(
        debounceTime(1000)
      ).subscribe((value: string) => {
        this.filtrarProducto( value );
      });
    }
  }

  ngAfterViewInit(): void {
    this.inputParams$.next(this.params);
  }

  // Obtenemos todos los cambios que nos envíe el paginador con la data de la página
  addDataToTable( event: Producto[] ): void {
    // Seteamos estos datos a la tabla
    this.dataSource = new MatTableDataSource<Producto>(event);
  }

  seleccionarProducto( row: Producto): void {
    this.permissions.hasPermission('productos.show').then((response: boolean) => {
      if (response) {
        this.clickTabla.emit(row);
        this.productoService.productoChange = row;
      }
    });
  }

  quitarProducto( element: Producto ): void {
    // Cerramos todos los dialogos abiertos hasta el momento
    this.dialog.closeAll();
    // Abrimos el nuevo dialogo con el mensaje
    this.dialog.open( DialogEliminarProductoComponent, { data: element } );
  }

  /**
   * @ngdoc method
   * @name buscarProducto
   * @description
   * Método que se ejecuta cuando el usuario ingresa un término de búsqueda
   * de forma simultanea, envía ese valor al api y recoge el resultado paginado
   * y lo pinta en la tabla
   * @param input: string
   * @return void
   */
  filtrarProducto( valor: string ): void {
    this.inputParams$.next(`${this.params}&search=${valor}`);
  }

  kardexHandler($event: any, idProducto: number){
    $event.preventDefault(); $event.stopPropagation();
    this.router.navigate(['/','panel','inventario','producto','kardex',idProducto])
  }

}
