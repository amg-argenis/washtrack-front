export interface InsertarUsuarioRequest {
    tenantId: string;
    nombre: string;
    email: string;
    password: string;
    rol: string;
}