import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoOrden'
})
export class EstadoOrdenPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    if ( value === 'P' ) {
      return 'Pendiente';
    } else if ( value === 'E' ) {
      return 'En Curso';
    } else if ( value === 'F' ) {
      return 'Finalizado';
    } else {
      return '';
    }
  }

}
