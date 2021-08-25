import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '@environments/environment';
import { DialogVentaComponent } from '../dialog-venta/dialog-venta.component';
import { Orden } from '../../../../../core/Models/orden.model';
import { VentasService } from '../../../../../core/services/ventas.service';
import { PaginatorComponent } from '../../../../../tools/components/paginator/paginator.component';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'sla-ventas-index',
  templateUrl: './ventas-index.component.html',
  styleUrls: ['./ventas-index.component.scss']
})
export class VentasIndexComponent implements OnInit {

  // declaraciones para la tabla
  displayedColumns: string[] = ['id', 'estado', 'subtotal', 'total', 'fecha'];
  dataSource!: MatTableDataSource<Orden>;
  clickedRows = new Set<Orden>();
  // Observable para manejar paginación
  inputPaginator: Subject<any>;

  selected = 'A';

  // Rango de fechas del datepicker
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor( private dialog: MatDialog,
               private ventasService: VentasService ) {
                this.inputPaginator = new Subject<any>();
               }

  ngOnInit(): void {
    this.ventasService.filtrarVentas('', '', '').subscribe((response: any) => {
      this.inputPaginator.next(response);
    });
  }

  /**
   * @ngdoc method
   * @name VentasIndexComponent:addDataToTable
   * @description
   * Recibe la información paginada proveniente del componente de paginación dentro del
   * módulo Tools, a través de un evento que notifica la recepción de la información,
   * y la coloca dentro del DataSource de la tabla para que esta se muestre.
   * @param event
   * @return void
   */
  addDataToTable( event: Orden[] ): void {
    this.dataSource = new MatTableDataSource<Orden>(event);
  }

  /**
   * @ngdoc method
   * @name mostrarVenta
   * @description
   * Recibe como parámetro el objeto Venta de la fila correspondiente seleccionada
   * y abre un dialogo con el componente DialogVentaComponent, pasandole como parámetro
   * dicho objeto, para que lo muestre en un formulario.
   * @param venta
   * @return void
   */
  mostrarVenta( venta: any ): void {
    this.dialog.open( DialogVentaComponent, { width: '50vw', data: venta } );
  }

  filtrarVentas(): void {
    this.ventasService.filtrarVentas('').subscribe((response: any) => {
      this.inputPaginator.next(response);
    });
  }

}
