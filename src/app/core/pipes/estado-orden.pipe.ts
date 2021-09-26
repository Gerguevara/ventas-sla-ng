import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoOrden'
})
export class EstadoOrdenPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    return '';
  }

}
