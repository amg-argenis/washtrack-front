export interface InsertarEntregaRequest {
    ordenId: string;
    fechaEntrega: string;
    totalEntregado: number | null;
    conformidadCliente: boolean | null;
    observaciones: string;
    tipo: string;
}