import { Recurso } from './recurso.model';
export interface Auth extends Recurso {
    usuario?: string;
    email?: string;
    password: string;
}
