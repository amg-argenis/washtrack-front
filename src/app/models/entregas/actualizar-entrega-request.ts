export interface ActualizarEntregaRequest {
    idEntrega: string;
    ordenId: string;
    fechaEntrega: string;
    totalEntregado: number;
    conformidadCliente: boolean;
    observaciones: string;
    estado: string;
}