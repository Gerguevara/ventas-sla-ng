import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { PaginatorResponse } from '@models/resultados/resultado-paginator.model';
import { PaginatorService } from '@tool-services/paginator.service';
import { Observable, Subject } from 'rxjs';

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
  @Input() inputPaginator!: Subject<PaginatorResponse>;
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
    if ( this.inputPaginator ) {
      this.inputPaginator.subscribe(( objeto: PaginatorResponse ) => {
        this.configPaginator = objeto;
        this.configurarPaginador( objeto );
      });
    } else {
      if ( this.urlData ) {
        this.paginatorService.getAllData( this.urlData, 5, this.params ).then((response: PaginatorResponse) => {
          this.configPaginator = response;
          this.configurarPaginador( response );
        });
      }
    }
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
