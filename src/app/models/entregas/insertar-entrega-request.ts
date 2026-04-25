export interface InsertarEntregaRequest {
    ordenId: string;
    fechaEntrega: string;
    totalEntregado: number;
    conformidadCliente: boolean;
    observaciones: string;
    tipo: string;
}