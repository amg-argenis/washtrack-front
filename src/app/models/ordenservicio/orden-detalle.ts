export interface OrdenDetalleDto {
  idDetalleOrden: string;
  ordenId: string;
  procesoId: string;
  tipoPrenda: string;
  cantidad: number;
  colorReferencia: string;
  tenantId: string;
}

export interface OrdenConDetalles {
  idOrden: string;
  clienteId: string;
  nombreCliente: string;
  folio: string;
  fechaIngreso: string;
  estado: string;
  totalPrendas: number;
  observaciones: string;
  createdAt: string;
  tenantId: string;
  fechaEntrega: string | null;
  ordenesDetalleDto: OrdenDetalleDto[];
}