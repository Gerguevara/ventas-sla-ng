import { Producto } from 'src/app/core/models/producto.model';

export interface ResultadoCarrito {
  Productos: Producto[],
  Resumen: {
    Subtotal: number,
    IVA: number,
    Total: number,
  }
}
