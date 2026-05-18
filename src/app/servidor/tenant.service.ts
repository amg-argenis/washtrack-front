import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TenantResponse } from '../models/tenant/tenant-response';
import { InsertarTenantRequest } from '../models/tenant/insertar-tenant-request';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  private apiUrl = '/washtrack/api/v1';

  constructor(private http: HttpClient) { }

  insertarTenant(request: InsertarTenantRequest): Observable<TenantResponse | null> {
    return this.http.post<TenantResponse>(
      `${this.apiUrl}/tenants/insertar`,
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