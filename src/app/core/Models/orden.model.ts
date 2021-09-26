import { PerfilUsuario } from 'src/app/core/models/perfil.usuario.model';
import { Producto } from 'src/app/core/models/producto.model';
import { Recurso } from './recurso.model';

export interface Orden extends Recurso{
  id_user: number;
  id_metodo_de_pago: number;
  estado: string;
  subtotal: number;
  total: number;
  created_at: string;
  productos?: Producto[];
  cliente?: PerfilUsuario[];
}
