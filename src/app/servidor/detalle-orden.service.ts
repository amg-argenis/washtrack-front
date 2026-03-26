import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { InsertarDetalleOrdenRequest } from '../models/detalleorden/insertar-detalle-orden-request';
import { DetalleOrdenResponse } from '../models/detalleorden/detalle-orden-response';
import { ActualizarDetalleOrdenRequest } from '../models/detalleorden/actualizar-detalle-orden-request';
import { EliminarDetalleOrdenRequest } from '../models/detalleorden/eliminar-detalleorden-request';

@Injectable({
  providedIn: 'root'
})
export class DetalleOrdenService {

  private apiUrl = '/washtrack/api/v1';

  constructor(private http: HttpClient) { }

  insertarDetalle(request: InsertarDetalleOrdenRequest): Observable<DetalleOrdenResponse | null> {
    return this.http.post<DetalleOrdenResponse>(
      `${this.apiUrl}/ordenes/detalles/guardar`,
      request,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  actualizarDetalle(request: ActualizarDetalleOrdenRequest): Observable<DetalleOrdenResponse | null> {
    return this.http.post<DetalleOrdenResponse>(
      `${this.apiUrl}/ordenes/detalles/actualizar`,
      request,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  eliminarDetalle(request: EliminarDetalleOrdenRequest): Observable<DetalleOrdenResponse | null> {
    return this.http.post<DetalleOrdenResponse>(
      `${this.apiUrl}/ordenes/detalles/eliminar`,
      request,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }
}