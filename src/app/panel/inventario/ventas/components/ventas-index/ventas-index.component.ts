import { Component, OnInit, LOCALE_ID, Inject, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogVentaComponent } from '../dialog-venta/dialog-venta.component';
import { Orden } from '../../../../../core/Models/orden.model';
import { VentasService } from '../../../../../core/services/ventas.service';
import { Subject, Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { environment } from '@environments/environment';

@Component({
  selector: 'sla-ventas-index',
  templateUrl: './ventas-index.component.html',
  styleUrls: ['./ventas-index.component.scss']
})
export class VentasIndexComponent implements OnInit, AfterViewInit {

  // declaraciones para la tabla
  displayedColumns: string[] = ['id', 'estado', 'subtotal', 'total', 'fecha'];
  dataSource!: MatTableDataSource<Orden>;
  clickedRows = new Set<Orden>();
  // URL para obtención de datos
  private endpoint = 'ordenes';
  urlData = `${environment.apiUrl}${this.endpoint}`;
  params = '&estado=&start=$end=';
  // Observable para manejar paginación
  inputParams$: Subject<string> = new Subject<string>();

  selected = '';

  // Rango de fechas del datepicker
  range = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required)
  });

  constructor( private dialog: MatDialog,
               private ventasService: VentasService,
               @Inject(LOCALE_ID) public locale: string ) {
               }
  ngAfterViewInit(): void {
    this.inputParams$.next(this.params);
  }

  ngOnInit(): void { }

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
  mostrarVenta( venta: Orden ): void {
    this.ventasService.obtenerVenta( venta ).subscribe((response: Orden) => {
      this.dialog.open( DialogVentaComponent, { width: '50vw', data: response } );
    });
  }

  filtrarVentas(): void {
    const fechaInicio = formatDate(this.range.get('start')?.value, 'yyyy-MM-dd HH:mm:ss', this.locale);
    const fechaFin = formatDate(this.range.get('end')?.value, 'yyyy-MM-dd HH:mm:ss', this.locale);
    this.inputParams$.next(`&estado=${this.selected}&start=${fechaInicio}$end=${fechaFin}`);
  }

}
