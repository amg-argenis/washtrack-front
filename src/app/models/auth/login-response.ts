export interface LoginResponse {
    success: boolean;
    message: string;
    registros: number;
    data: {
        idUsuario: string;
        tenantId: string;
        nombre: string;
        email: string;
        rol: string;
        activo: boolean;
        token: string;
    };
}