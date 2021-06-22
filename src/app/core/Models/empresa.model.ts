import { Recurso } from './recurso.model';
export interface Empresa extends Recurso {
    username: string;
    nombreComercial: string;
    nitFrontal: string;
    nitReverso: string;
    email: string;
    password: string;
    estadoCuenta: string;
}
