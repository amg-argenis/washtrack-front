import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ClienteResponse } from '../models/clientes/cliente-response';
import { InsertarClienteRequest } from '../models/clientes/insertar-cliente-request';
import { ActualizarClienteRequest } from '../models/clientes/actualizar-cliente-request';
import { EliminarClienteRequest } from '../models/clientes/eliminar-cliente-request';
import { BuscarClienteRequest } from '../models/clientes/buscar-cliente-request';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = '/washtrack/api/v1';

  constructor(private http: HttpClient) { }

  listarClientes(): Observable<ClienteResponse | null> {
    return this.http.post<ClienteResponse>(
      `${this.apiUrl}/clientes/listar`,
      {},
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  buscarCliente(request: BuscarClienteRequest): Observable<ClienteResponse | null> {
    return this.http.post<ClienteResponse>(
      `${this.apiUrl}/clientes/buscar`,
      request,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  insertarCliente(request: InsertarClienteRequest): Observable<ClienteResponse | null> {
    return this.http.post<ClienteResponse>(
      `${this.apiUrl}/clientes/insertar`,
      request,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  actualizarCliente(request: ActualizarClienteRequest): Observable<ClienteResponse | null> {
    return this.http.post<ClienteResponse>(
      `${this.apiUrl}/clientes/actualizar`,
      request,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  eliminarCliente(request: EliminarClienteRequest): Observable<ClienteResponse | null> {
    return this.http.post<ClienteResponse>(
      `${this.apiUrl}/clientes/eliminar`,
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