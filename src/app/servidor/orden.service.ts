import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdenResponse } from '../models/ordenservicio/ordenrespuesta';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private apiUrl = '/washtrack/api/v1';

  constructor(private http: HttpClient) { }

  listarOrdenesServicio(): Observable<OrdenResponse> {
    return this.http.get<OrdenResponse>(`${this.apiUrl}/ordenes/listar`);
  }

}