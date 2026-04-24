import { Entrega } from './entrega';

export interface EntregaResponse {
    success: boolean;
    message: string;
    registros: number;
    data: Entrega[];
}