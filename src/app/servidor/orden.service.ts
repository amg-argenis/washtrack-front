import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { OrdenResponse } from '../models/ordenservicio/ordenrespuesta';
import { InsertarOrdenRequest } from '../models/ordenservicio/insertar-orden-request';
import { ActualizarOrdenRequest } from '../models/ordenservicio/actualizar-orden-request';
import { BuscarOrdenRequest } from '../models/ordenservicio/BuscarOrdenRequest';
import { BuscarOrdenResponse } from '../models/ordenservicio/BuscarOrdenResponse';
import { BuscarOrdenConDetalleResponse } from '../models/ordenservicio/BuscarOrdenConDetalleResponse';
import { EliminarOrdenRequest } from '../models/ordenservicio/EliminarOrdenRequest';
import { InsertarOrdenResponse } from '../models/ordenservicio/orden-response';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private apiUrl = '/washtrack/api/v1';

  constructor(private http: HttpClient) { }

  listarOrdenesServicio(): Observable<OrdenResponse | null> {
    return this.http.get<OrdenResponse>(
      `${this.apiUrl}/ordenes/listar`,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  buscarOrden(orden: BuscarOrdenRequest): Observable<BuscarOrdenResponse | null> {
    return this.http.post<BuscarOrdenResponse>(
      `${this.apiUrl}/ordenes/buscar`,
      orden,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  buscarOrdenConDetalle(orden: BuscarOrdenRequest): Observable<BuscarOrdenConDetalleResponse | null> {
    return this.http.post<BuscarOrdenConDetalleResponse>(
      `${this.apiUrl}/ordenes/orden-detalle`,
      orden,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  crearOrden(orden: InsertarOrdenRequest): Observable<InsertarOrdenResponse | null> {
    return this.http.post<InsertarOrdenResponse>(
      `${this.apiUrl}/ordenes/crear`,
      orden,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  actualizarOrden(orden: ActualizarOrdenRequest): Observable<OrdenResponse | null> {
    return this.http.post<OrdenResponse>(
      `${this.apiUrl}/ordenes/actualizar`,
      orden,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  eliminarOrden(request: EliminarOrdenRequest): Observable<OrdenResponse | null> {
    return this.http.post<OrdenResponse>(
      `${this.apiUrl}/ordenes/eliminar`,
      request,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  listarOrdenesPorFecha(fecha: string): Observable<OrdenResponse | null> {
    return this.http.get<OrdenResponse>(
      `${this.apiUrl}/ordenes/fechaingreso?fechaIngreso=${fecha}`,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

}