import { PerfilUsuario } from '@core/models/perfil.usuario.model';
import { Producto } from '@core/models/producto.model';

export interface Orden {
  id: number;
  id_user: number;
  id_metodo_de_pago: number;
  estado: string;
  subtotal: number;
  total: number;
  created_at: string;
  productos?: Producto[];
  cliente?: PerfilUsuario[];
}
