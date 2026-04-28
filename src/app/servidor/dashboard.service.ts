import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DashboardResponse } from '../models/dashboard/dashboard-response';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = '/washtrack/api/v1';

  constructor(private http: HttpClient) { }

  obtenerDashboard(): Observable<DashboardResponse | null> {
    return this.http.get<DashboardResponse>(
      `${this.apiUrl}/busquedas/dashboard`,
      { observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }
}