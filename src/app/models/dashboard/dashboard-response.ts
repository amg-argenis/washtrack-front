export interface DashboardResponse {
    success: boolean;
    message: string;
    registros: number;
    data: {
        ordenesActivas: number;
        clientesActivos: number;
        entregasMes: number;
        prendasEnProceso: number;
        ordenesListas: number;
        ordenesEntregadasMes: number;
    };
}