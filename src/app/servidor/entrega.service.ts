import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { EntregaResponse } from '../models/entregas/entrega-response';
import { InsertarEntregaRequest } from '../models/entregas/insertar-entrega-request';
import { ActualizarEntregaRequest } from '../models/entregas/actualizar-entrega-request';
import { EliminarEntregaRequest } from '../models/entregas/eliminar-entrega-request';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {

  private apiUrl = '/washtrack/api/v1';

  constructor(private http: HttpClient) { }

  listarEntregas(): Observable<EntregaResponse | null> {
    return this.http.get<EntregaResponse>(
      `${this.apiUrl}/entregas/listar`,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  buscarEntrega(idEntrega: string): Observable<EntregaResponse | null> {
    return this.http.get<EntregaResponse>(
      `${this.apiUrl}/entregas/buscar/entregaRequest?entregaRequest=${idEntrega}`,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  insertarEntrega(request: InsertarEntregaRequest): Observable<EntregaResponse | null> {
    return this.http.post<EntregaResponse>(
      `${this.apiUrl}/entregas/insertar`,
      request,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  actualizarEntrega(request: ActualizarEntregaRequest): Observable<EntregaResponse | null> {
    return this.http.post<EntregaResponse>(
      `${this.apiUrl}/entregas/actualizar`,
      request,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  eliminarEntrega(request: EliminarEntregaRequest): Observable<EntregaResponse | null> {
    return this.http.post<EntregaResponse>(
      `${this.apiUrl}/entregas/eliminar`,
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
