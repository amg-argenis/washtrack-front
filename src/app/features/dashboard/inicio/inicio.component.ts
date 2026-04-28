import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardService } from '../../../servidor/dashboard.service';
import { DashboardResponse } from '../../../models/dashboard/dashboard-response';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, DatePipe],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  dashboard: DashboardResponse['data'] | null = null;
  cargando = true;
  hoy: Date = new Date();

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarDashboard();
  }

  cargarDashboard() {
    this.dashboardService.obtenerDashboard().subscribe({
      next: (response) => {
        this.cargando = false;
        if (!response) return;
        this.dashboard = response.data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error al cargar dashboard:', err);
      }
    });
  }
}
