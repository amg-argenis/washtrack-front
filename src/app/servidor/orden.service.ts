import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdenResponse } from '../models/ordenservicio/ordenrespuesta';
import { InsertarOrdenRequest } from '../models/ordenservicio/insertar-orden-request';
import { ActualizarOrdenRequest } from '../models/ordenservicio/actualizar-orden-request';
import { EliminarOrdenRequest } from '../models/ordenservicio/eliminar-orden-request';
import { BuscarOrdenRequest } from '../models/ordenservicio/BuscarOrdenRequest';
import { BuscarOrdenResponse } from '../models/ordenservicio/BuscarOrdenResponse';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private apiUrl = '/washtrack/api/v1';

  constructor(private http: HttpClient) { }

  listarOrdenesServicio(): Observable<OrdenResponse> {
    return this.http.get<OrdenResponse>(`${this.apiUrl}/ordenes/listar`);
  }

  buscarOrden(orden: BuscarOrdenRequest): Observable<BuscarOrdenResponse> {
    return this.http.post<BuscarOrdenResponse>(`${this.apiUrl}/ordenes/buscar`, orden);
  }

  crearOrden(orden: InsertarOrdenRequest): Observable<OrdenResponse> {
    return this.http.post<OrdenResponse>(`${this.apiUrl}/ordenes/crear`, orden);
  }

  actualizarOrden(orden: ActualizarOrdenRequest): Observable<OrdenResponse> {
    return this.http.post<OrdenResponse>(`${this.apiUrl}/ordenes/actualizar`, orden);
  }

  eliminarOrden(request: EliminarOrdenRequest): Observable<OrdenResponse> {
    return this.http.post<OrdenResponse>(`${this.apiUrl}/ordenes/eliminar`, request);
  }
}