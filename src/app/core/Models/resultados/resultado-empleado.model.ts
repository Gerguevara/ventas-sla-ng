import { PerfilEmpleado } from '../perfil.empleado.model';
import { PerfilUsuario } from '../perfil.usuario.model';
import { Usuario } from './../usuario.model';

export interface ResultadoEmpleado {
  resultado: boolean,
  usuario: Usuario
  perfilusuario: PerfilUsuario,
  perfilempleado: PerfilEmpleado,
}
