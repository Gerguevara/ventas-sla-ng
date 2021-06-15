import { Recurso } from "./recurso.model";

export interface Producto extends Recurso{
    id_categoria: number,
    nombre_producto: string,
    descripcion_producto: string,
    disponibilidad: number,
    imagen: string,
    calificacion_promedio: string,
    precio: string,
    cantidad: number
}
