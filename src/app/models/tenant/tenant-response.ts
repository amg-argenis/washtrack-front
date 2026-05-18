import { Tenant } from './tenant';

export interface TenantResponse {
    success: boolean;
    message: string;
    registros: number;
    data: Tenant | Tenant[];
}