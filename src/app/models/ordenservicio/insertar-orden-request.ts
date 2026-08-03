export interface InsertarOrdenRequest {
  clienteId: string;
  fechaIngreso: string;
  estado: string;
  totalPrendas: number | null;
  observaciones?: string;
  fechaEntrega?: string;
}