export interface Orden {
  id: number;
  id_user: number;
  id_metodo_de_pago: number;
  estado: string;
  subtotal: number;
  total: number;
  created_at: string;
  updated_at: string;
}
