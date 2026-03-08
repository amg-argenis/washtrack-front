import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orden } from '../models/orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private apiUrl = '/washtrack/api/v1';

  constructor(private http: HttpClient) {}

  listarOrdenesServicio(): Observable<Orden[]> {
    return this.http.get<Orden[]>(`${this.apiUrl}/ordenes/listar`);
  }

}