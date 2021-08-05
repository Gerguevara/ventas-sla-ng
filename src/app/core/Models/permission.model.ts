import { Recurso } from './recurso.model';
export interface Permission extends Recurso {
    name: string;
    descripcion: string;
    panel_id: number;
    guard_name: string;
    created_at: string;
    updated_at: string;
}
