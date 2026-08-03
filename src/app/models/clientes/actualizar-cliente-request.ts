export interface ActualizarClienteRequest {
    idCliente: string;
    tenantId: string;
    nombre: string;
    contacto: string;
    telefono: string;
    email: string;
    creditoHabilitado: boolean | null;
    limiteCredito: number | null;
    activo: boolean;
}