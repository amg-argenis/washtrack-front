import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UsuarioResponse } from '../models/usuarios/usuario-response';
import { InsertarUsuarioRequest } from '../models/usuarios/insertar-usuario-request';
import { ActualizarUsuarioRequest } from '../models/usuarios/actualizar-usuario-request';
import { EliminarReactivarUsuarioRequest } from '../models/usuarios/eliminar-reactivar-usuario-request';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = '/washtrack/api/v1';

  constructor(private http: HttpClient) { }

  listarUsuarios(): Observable<UsuarioResponse | null> {
    return this.http.get<UsuarioResponse>(
      `${this.apiUrl}/usuarios/busquedas/listar-tenantid`,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  buscarUsuarioPorEmail(email: string): Observable<UsuarioResponse | null> {
    return this.http.get<UsuarioResponse>(
      `${this.apiUrl}/usuarios/busquedas/${email}`,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  insertarUsuario(request: InsertarUsuarioRequest): Observable<UsuarioResponse | null> {
    return this.http.post<UsuarioResponse>(
      `${this.apiUrl}/usuarios/insertar`,
      request,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  actualizarUsuario(request: ActualizarUsuarioRequest): Observable<UsuarioResponse | null> {
    return this.http.post<UsuarioResponse>(
      `${this.apiUrl}/usuarios/actualizar`,
      request,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  eliminarUsuario(request: EliminarReactivarUsuarioRequest): Observable<UsuarioResponse | null> {
    return this.http.post<UsuarioResponse>(
      `${this.apiUrl}/usuarios/eliminar`,
      request,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  reactivarUsuario(request: EliminarReactivarUsuarioRequest): Observable<UsuarioResponse | null> {
    return this.http.post<UsuarioResponse>(
      `${this.apiUrl}/usuarios/reactivar`,
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