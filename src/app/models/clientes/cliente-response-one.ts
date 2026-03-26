import { Cliente } from "./cliente";

// Para buscar - devuelve un solo objeto
export interface ClienteResponseOne {
    success: boolean;
    message: string;
    registros: number;
    data: Cliente;
}