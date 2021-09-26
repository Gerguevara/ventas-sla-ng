export interface Usuario {
    id: number,
    email: string,
    email_verified_at?: string,
    tipoUsuario: string,
    two_factor_secret?: string,
    two_factor_recovery_codes?: string[],
    dosPasos: number,
    password_change_at?: string,
}
