export interface Entrega {
    idEntrega: string;
    tenantId: string;
    ordenId: string;
    fechaEntrega: string;
    totalEntregado: number;
    conformidadCliente: boolean;
    observaciones: string;
    estado: string;
    fechaCreacion: string;
}