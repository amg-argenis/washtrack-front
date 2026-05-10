import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProcesoService } from '../../../servidor/proceso.service';
import { Proceso } from '../../../models/procesos/proceso';

@Component({
  selector: 'app-listar-procesos',
  imports: [CommonModule],
  templateUrl: './listar-procesos.component.html',
  styleUrl: './listar-procesos.component.css'
})
export class ListarProcesosComponent implements OnInit {

  listadoProcesos: Proceso[] = [];

  constructor(
    private procesoService: ProcesoService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.listarProcesos();
  }

  listarProcesos() {
    this.procesoService.listarProcesos().subscribe({
      next: (response) => {
        if (!response) {
          this.listadoProcesos = [];
          this.cdr.detectChanges();
          return;
        }
        this.listadoProcesos = Array.isArray(response.data)
          ? response.data
          : [response.data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al listar procesos:', err)
    });
  }

  crearProceso() {
    this.router.navigate(['/procesos/crear']);
  }

  editarProceso(proceso: Proceso) {
    localStorage.setItem('procesoLocal', JSON.stringify(proceso));
    this.router.navigate(['/procesos/editar']);
  }

  eliminarProceso(proceso: Proceso) {
    if (!confirm(`Eliminar el proceso "${proceso.nombre}"?`)) return;

    this.procesoService.eliminarProceso(proceso.idproceso).subscribe({
      next: () => this.listarProcesos(),
      error: (err) => console.error('Error al eliminar proceso:', err)
    });
  }
}
