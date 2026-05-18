import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UsuarioResponse } from '../models/usuarios/usuario-response';
import { InsertarUsuarioRequest } from '../models/usuarios/insertar-usuario-request';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = '/washtrack/api/v1';

  constructor(private http: HttpClient) { }

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
}