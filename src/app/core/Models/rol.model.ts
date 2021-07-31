import { Recurso } from "./recurso.model";
import { Permission } from './permission.model';

export interface Rol extends Recurso {
    name: string;
    guard_name?: string;
    descripcion: string;
    id_departamento: string;
    created_at?: string;
    updated_at?: string;
    permissions?: Permission[];
}
