import { Usuario } from './usuario';

export interface UsuarioResponse {
    success: boolean;
    message: string;
    registros: number;
    data: Usuario | Usuario[];
}