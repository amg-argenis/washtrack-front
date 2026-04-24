import { Entrega } from "./entrega";

// In entrega-response.ts
export interface EntregaResponse {
    success: boolean;
    message: string;
    registros: number;
    data: Entrega | Entrega[];
}