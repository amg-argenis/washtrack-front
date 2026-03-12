import { Orden } from "./orden";

export class BuscarOrdenResponse {
  success!: boolean;
  message!: string;
  registros!: number;
  data!: Orden;
}