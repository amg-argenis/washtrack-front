export interface InsertarOrdenRequest {
  clienteId: string;
  fechaIngreso: string;
  estado: string;
  totalPrendas: number;
  observaciones?: string;
  tenantId?: string;
  fechaEntrega?: string;
}