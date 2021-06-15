import { Recurso } from "./recurso.model";

export interface Etiqueta extends Recurso {
    categoria_id: number,
    nombre: string,
    descripcion: string
}
