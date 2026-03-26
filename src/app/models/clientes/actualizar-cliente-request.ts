export interface ActualizarClienteRequest {
    idCliente: string;
    tenantId: string;
    nombre: string;
    contacto: string;
    telefono: string;
    email: string;
    creditoHabilitado: boolean;
    limiteCredito: number;
}