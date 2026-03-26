import { DetalleOrden } from './detalle-orden';

export interface DetalleOrdenResponse {
    success: boolean;
    message: string;
    registros: number;
    data: DetalleOrden;
}