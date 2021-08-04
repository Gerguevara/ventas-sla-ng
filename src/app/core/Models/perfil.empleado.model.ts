import { PerfilUsuario } from './perfil.usuario.model';

export interface PerfilEmpleado extends PerfilUsuario {
  user_ide: number,
  departamento_ide: number,
  dui: string,
  nit: string,
  afp: string,
  isss: string,
  estudios: string,
  salario: string,
  inicio: string,
  final?: string,
  trabajando: number
}
