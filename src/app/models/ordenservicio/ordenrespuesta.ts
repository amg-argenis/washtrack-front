import { Orden } from "./orden";

export interface OrdenResponse {
  success: boolean;
  message: string;
  registros: number;
  data: Orden[];
}