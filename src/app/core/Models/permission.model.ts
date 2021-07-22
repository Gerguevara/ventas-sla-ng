import { Recurso } from './recurso.model';
export interface Permission extends Recurso {
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    pivot: {
        role_id: number;
        permission_id: number;
    };
}
