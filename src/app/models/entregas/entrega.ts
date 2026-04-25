export interface Entrega {
    idEntrega: string;
    tenantId: string;
    ordenId: string;
    folio: string;
    cliente: string;
    fechaEntrega: string;
    totalEntregado: number;
    conformidadCliente: boolean;
    observaciones: string;
    estado: string;
    fechaCreacion: string;
}