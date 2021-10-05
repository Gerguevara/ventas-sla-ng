import { Recurso } from './recurso.model';

export interface Departamento extends Recurso{
    nombre: string,
    descripcion: string
}
