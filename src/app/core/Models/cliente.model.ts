import { Recurso } from './recurso.model';
export interface Cliente extends Recurso {
    email: string;
    password: string;
}