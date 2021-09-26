import { Recurso } from "./recurso.model";

export interface Transaccion extends Recurso {
  id_producto: number,
  tipo: string,
  cantidad: number,
  existencia: number,
  precio_unitario: number,
  total: number,
  created_at: Date,
  cantidad_existencia: number,
  valor_existencia: number,
  total_existencia: number
}
