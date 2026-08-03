export interface ActualizarEntregaRequest {
    idEntrega: string;
    ordenId: string;
    fechaEntrega: string;
    totalEntregado: number | null;
    conformidadCliente: boolean | null;
    observaciones: string;
    estado: string;
    tipo: string;
}