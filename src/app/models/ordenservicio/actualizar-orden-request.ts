export interface ActualizarOrdenRequest {
  idOrden: string;
  clienteId: string;
  nombreCliente: string;
  folio: string;
  fechaIngreso: string;
  estado: string;
  totalPrendas: number;
  observaciones?: string;
  fechaEntrega: string;
}