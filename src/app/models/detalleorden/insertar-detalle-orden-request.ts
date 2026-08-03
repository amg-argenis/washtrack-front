export interface InsertarDetalleOrdenRequest {
    ordenId: string;
    procesoId: string;
    tipoPrenda: string | null;
    cantidad: number | null;
    colorReferencia: string | null;
}