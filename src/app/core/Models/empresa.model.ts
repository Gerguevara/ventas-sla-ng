import { Recurso } from './recurso.model';
export interface Empresa extends Recurso {
    username: string;
    nombreComercial: string;
    email: string;
    nitFrontal: string;
    nitReverso: string;
    tipoUsuario: string;
    dosPasos: string;
    estadoCuenta: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
}
