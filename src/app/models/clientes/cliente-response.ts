import { Cliente } from './cliente';

export interface ClienteResponse {
    success: boolean;
    message: string;
    registros: number;
    data: Cliente[];
}