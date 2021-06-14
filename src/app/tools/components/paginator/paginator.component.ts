import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginatorResponse } from 'src/app/empleado/models/paginator.model';
import { PaginatorService } from '../../services/paginator.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, AfterViewInit {

  // Inputs requeridas para el paginador
  @Input() urlData = '';
  configPaginator!: PaginatorResponse;
  pageSizeOptions!: number[];
  length!: number;
  pageSize!: number;

  // MatPaginator Output
  pageEvent!: PageEvent;

  constructor( private paginatorService: PaginatorService ) { }

  ngOnInit(): void {
    this.paginatorService.getAllData( this.urlData, 5 ).then((response: PaginatorResponse) => {
      this.configPaginator = response;
      // Establecemos los valores de las variables con los datos de la Input
      this.pageSizeOptions = [ 5, 10, 15, 20 ];
      this.length = this.configPaginator.total;
      this.pageSize = Number(this.configPaginator.per_page);
      // Enviamos la data por el observable hacia el componente
      this.paginatorService.pageDataChange$.emit(response.data);
    });
  }

  ngAfterViewInit(): void {
  }

  changePageEvent( event: any ): void{
    // Cuando el usuario cambia de página o el numero de items por pagina se dispara este método
    // Aquí llamamos directamente al servicio para obtener los datos según la acción que el usuario realizó
    this.paginatorService.getPageData( this.configPaginator.links[ event.pageIndex + 1 ].url, event.pageSize )
    .then((response: PaginatorResponse) => {
      // Seteamos la nueva configuración
      this.configPaginator = response;
      // Establecemos los valores de las variables con los datos de la respuesta
      this.pageSizeOptions = [ 5, 10, 15, 20 ];
      this.length = this.configPaginator.total;
      this.pageSize = Number(this.configPaginator.per_page);
      // Enviamos la data por el observable hacia el componente
      this.paginatorService.pageDataChange$.emit(response.data);
    });
    // Guardamos el nuevo estado del evento
    this.pageEvent = event;
  }

}
