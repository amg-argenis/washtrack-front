import { Proceso } from './proceso';

export interface ProcesoResponse {
    success: boolean;
    message: string;
    registros: number;
    data: Proceso | Proceso[];
}