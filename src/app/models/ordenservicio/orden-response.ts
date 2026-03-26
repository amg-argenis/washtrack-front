import { Orden } from "./orden";

export interface InsertarOrdenResponse {
  success: boolean;
  message: string;
  registros: number;
  data: Orden;
}