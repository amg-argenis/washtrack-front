import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orden } from '../models/orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private apiUrl = 'http://localhost:8080/washtrack/api/v1/ordenes/listar';

  constructor(private http: HttpClient) {}

  buscarOrdenes(): Observable<Orden[]> {
    return this.http.get<Orden[]>(`${this.apiUrl}/buscar`);
  }

}