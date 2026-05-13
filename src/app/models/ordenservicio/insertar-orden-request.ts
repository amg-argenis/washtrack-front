export interface InsertarOrdenRequest {
  clienteId: string;
  fechaIngreso: string;
  estado: string;
  totalPrendas: number;
  observaciones?: string;
  fechaEntrega?: string;
}