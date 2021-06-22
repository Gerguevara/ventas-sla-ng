import { Resource } from './resource.models';

export interface Producto extends Resource {
    id: number;
    id_categoria: number;
    nombre_producto: string;
    descripcion_producto: string;
    disponibilidad: number;
    imagen: string;
    calificacion_promedio: string;
    precio: string;
    cantidad: number;
}
