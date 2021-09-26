import { Producto } from '@models/producto.model';

export interface ResultadoCarrito {
  Productos: Producto[],
  Resumen: {
    Subtotal: number,
    IVA: number,
    Total: number,
  }
}
