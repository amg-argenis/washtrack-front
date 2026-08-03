export interface InsertarClienteRequest {
    nombre: string;
    contacto: string;
    telefono: string;
    email: string;
    creditoHabilitado: boolean | null;
    limiteCredito: number | null;
}