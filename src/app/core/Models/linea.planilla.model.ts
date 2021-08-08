import { Resultado } from "./resultados/resultado.model";

export interface LineaPlanilla extends Resultado {
    id_empleado: number;
    id_planilla: number;
    comisiones: number;
    horas_extras_diurnas: number;
    valor_horas_extras_diurnas: number;
    horas_extras_nocturnas: number;
    valor_horas_extras_nocturnas: number;
    horas_extras_domingo: number;
    valor_horas_extras_domingo: number;
    total_horas_extras: number;
    otros_ingresos: number;
    total_ingresos: number;
    isss: number;
    afp: number;
    otras_deducciones: number;
    total_descuentos: number;
    renta: number;
    a_recibir: number;
    created_at: string;
    updated_at: string;
}
