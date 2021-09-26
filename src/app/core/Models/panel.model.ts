import { Recurso } from "./recurso.model";

export interface Panel extends Recurso {
    name: string;
    descripcion: string;
}
