import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdenResponse } from '../models/ordenservicio/ordenrespuesta';
import { InsertarOrdenRequest } from '../models/ordenservicio/ordenrespuesta';
import { ActualizarOrdenRequest } from '../models/ordenservicio/ordenrespuesta';
import { EliminarOrdenRequest } from '../models/ordenservicio/ordenrespuesta';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private apiUrl = '/washtrack/api/v1';

  constructor(private http: HttpClient) { }

  listarOrdenesServicio(): Observable<OrdenResponse> {
    return this.http.get<OrdenResponse>(`${this.apiUrl}/ordenes/listar`);
  }

  buscarOrden(idOrden: string, folio: string): Observable<OrdenResponse> {
    return this.http.post<any>(`${this.apiUrl}/ordenes/buscar`, { idOrden, folio });
  }

  crearOrden(orden: InsertarOrdenRequest): Observable<OrdenResponse> {
    return this.http.post<any>(`${this.apiUrl}/ordenes/crear`, orden);
  }

  actualizarOrden(orden: ActualizarOrdenRequest): Observable<OrdenResponse> {
    return this.http.post<any>(`${this.apiUrl}/ordenes/actualizar`, orden);
  }

  eliminarOrden(request: EliminarOrdenRequest): Observable<OrdenResponse> {
    return this.http.post<any>(`${this.apiUrl}/ordenes/eliminar`, request);
  }
}