import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ProcesoResponse } from '../models/procesos/proceso-response';
import { InsertarProcesoRequest } from '../models/procesos/insertar-proceso-request';
import { ActualizarProcesoRequest } from '../models/procesos/actualizar-proceso-request';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  private apiUrl = '/washtrack/api/v1';

  constructor(private http: HttpClient) { }

  listarProcesos(): Observable<ProcesoResponse | null> {
    return this.http.get<ProcesoResponse>(
      `${this.apiUrl}/procesos/listar`,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  insertarProceso(request: InsertarProcesoRequest): Observable<ProcesoResponse | null> {
    return this.http.post<ProcesoResponse>(
      `${this.apiUrl}/procesos/insertar`,
      request,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  actualizarProceso(request: ActualizarProcesoRequest): Observable<ProcesoResponse | null> {
    return this.http.post<ProcesoResponse>(
      `${this.apiUrl}/procesos/actualizar`,
      request,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  eliminarProceso(idproceso: string): Observable<ProcesoResponse | null> {
    return this.http.post<ProcesoResponse>(
      `${this.apiUrl}/procesos/eliminar/procesoRequest?procesoRequest=${idproceso}`,
      {},
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }
}
