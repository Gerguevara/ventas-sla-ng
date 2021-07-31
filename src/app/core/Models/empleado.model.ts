import { Usuario } from './usuario.model';

export interface Empleado extends Usuario {
  nombres: string;
  apellidos: string;
  genero: string;
  telefono: string;
  direccion: string;
  estadoCivil : string;
  dui: string;
  nit: string;
  afp: string;
  isss: string;
  nivelEstudios: string;
  salario: number;
  fechaInicio: string;
}
