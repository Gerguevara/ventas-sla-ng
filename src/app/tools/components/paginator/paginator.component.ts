import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { PaginatorResponse } from '@models/resultados/resultado-paginator.model';
import { PaginatorService } from '@tool-services/paginator.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, AfterViewInit {

  // Inputs requeridas para el paginador
  @Input() urlData = '';
  // Esta es para parámetros adicionales opcionales
  @Input() params = '';
  // Input opcional de objeto de tipo PaginatroResponse para que el componente lo pagine
  @Input() inputParams$!: Subject<any>;
  configPaginator!: PaginatorResponse;
  pageSizeOptions!: number[];
  length!: number;
  pageSize!: number;

  // Salida de la data del componente hacia otro
  @Output() pageDataChange$ = new EventEmitter<any>();

  // MatPaginator Output
  pageEvent!: PageEvent;

  constructor( private paginatorService: PaginatorService ) { }

  ngOnInit(): void {
    // Verificamos que exista la url de los datos al iniciar el componente
    if ( this.urlData ) {
      // Verificamos si se nos manda un obsrevable con parámetros que cambian constantemente
      if ( this.inputParams$ ) {
        // De ser así nos suscribimos a los cambios y obtenemos los datos del API cada vez que
        // cambien dichos parámetros
        this.inputParams$.subscribe((param: string) => {
          this.params = param;
          // Invocamos el método para obtener los datos y configurar el paginador
          this.obtenerDatos( this.urlData );
        });
      } else {
        // De lo contrario invocamos el método enviando los parámetros que deben venir por defecto
        this.obtenerDatos( this.urlData );
      }
    }
  }

  /**
   * @ngdoc method
   * @name obtenerDatos
   * @description
   * Obtiene todos los datos de la tabla al iniciar el componente, con su configuración de paginación
   * e invoca le método para configurar el paginador con fichos datos
   * @param urlData: string
   * @param params: string
   * @returns void
   */
  obtenerDatos( urlData: string ): void {
    this.paginatorService.getAllData( urlData, 5, this.params ).then((response: PaginatorResponse) => {
      this.configPaginator = response;
      this.configurarPaginador( response );
    });
  }

  /**
   * @ngdoc method
   * @name configurarPaginador
   * @description
   * Método para realizar la configuración de cantidad de items por página,
   * longitud de la lista total, y realización del envío de la lista de la página
   * actual al componente padre.
   * @param response:PaginatorResponse
   * @return void
   */
  configurarPaginador( response: PaginatorResponse ): void {
    // Establecemos los valores de las variables con los datos de la Input
    this.pageSizeOptions = [ 5, 10, 15, 20 ];
    this.length = this.configPaginator.total;
    this.pageSize = Number(this.configPaginator.per_page);
    // Enviamos la data por el observable hacia el componente
    this.pageDataChange$.emit(response.data);
  }

  ngAfterViewInit(): void {
  }

  changePageEvent( event: any ): void{
    // Cuando el usuario cambia de página o el numero de items por pagina se dispara este método
    // Aquí llamamos directamente al servicio para obtener los datos según la acción que el usuario realizó
    this.paginatorService.getPageData( this.configPaginator.links[ event.pageIndex + 1 ].url, event.pageSize, this.params )
    .then((response: PaginatorResponse) => {
      // Seteamos la nueva configuración
      this.configPaginator = response;
      // Establecemos los valores de las variables con los datos de la respuesta
      this.pageSizeOptions = [ 5, 10, 15, 20 ];
      this.length = this.configPaginator.total;
      this.pageSize = Number(this.configPaginator.per_page);
      // Enviamos la data por el observable hacia el componente
      this.pageDataChange$.emit(response.data);
    });
    // Guardamos el nuevo estado del evento
    this.pageEvent = event;
  }

}
