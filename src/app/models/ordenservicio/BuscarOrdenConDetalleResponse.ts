import { OrdenConDetalles } from "./orden-detalle";

export class BuscarOrdenConDetalleResponse {
  success!: boolean;
  message!: string;
  registros!: number;
  data!: OrdenConDetalles;
}