import { Usuario } from "./usuario.model";

export interface PerfilUsuario extends Usuario {
  user_id: number,
  nombres?: string,
  apellidos?: string,
  telefono?: string,
  direccion?: string,
  estadoCivil?: string,
  genero?: string,
}
