import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginatorResponse } from 'src/app/empleado/models/paginator.model';
import { PaginatorService } from '../../services/paginator.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  // Inputs requeridas para el paginador
  // @Input() config!: PaginatorResponse;
  pageSizeOptions: number[];
  length: number;
  pageSize: number;

  // Salida de la data recibida por el servidor
  @Output() dataChangePage = new EventEmitter<PaginatorResponse>();

  // MatPaginator Output
  pageEvent!: PageEvent;

  constructor( private paginatorService: PaginatorService ) {
    // Establecemos los valores de las variables con los datos de la Input
    this.pageSizeOptions = [ 5, 10, 15, 20 ];
    // this.length = this.config?.total;
    this.length = 100;
    // this.pageSize = Number(this.config?.per_page);
    this.pageSize = 10;
  }

  ngOnInit(): void {
  }

  changePageEvent( event: any ): void{
    // Cuando el usuario cambia de página se dispara este método
    // Capturamos el valor del evento
    this.pageEvent = event;
    // Lo imprimimos en consola para monitorear
    console.log(this.pageEvent?.pageIndex);
    /* Llamamos al servicio y le mandamos el index base 0 de la página a la cual el usuario se ha
       movido. */
    this.paginatorService.getDataChangePage( this.pageEvent!.pageIndex + 1 ).subscribe( (response: PaginatorResponse) => {
      // Emitimos el nuevo valor de la respuesta obtenida de la data que hemos solicitado de la nueva página
      this.dataChangePage.emit( response );
      // this.config = response;
    });
  }

}
