import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../servidor/usuario.service';
import { Usuario } from '../../../models/usuarios/usuario';
import { EliminarReactivarUsuarioRequest } from '../../../models/usuarios/eliminar-reactivar-usuario-request';

@Component({
  selector: 'app-listar-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css'
})
export class ListarUsuariosComponent implements OnInit {

  listadoUsuarios: Usuario[] = [];
  listadoFiltrado: Usuario[] = [];
  listadoPaginado: Usuario[] = [];
  textoBusqueda: string = '';

  // Pagination
  paginaActual: number = 1;
  registrosPorPagina: number = 5;
  totalPaginas: number = 0;
  paginas: number[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.usuarioService.listarUsuarios().subscribe({
      next: (response) => {
        if (!response) {
          this.listadoUsuarios = [];
          this.listadoFiltrado = [];
          this.calcularPaginacion();
          this.cdr.detectChanges();
          return;
        }
        this.listadoUsuarios = Array.isArray(response.data)
          ? response.data
          : [response.data];
        this.listadoFiltrado = [...this.listadoUsuarios];
        this.paginaActual = 1;
        this.calcularPaginacion();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al listar usuarios:', err)
    });
  }

  crearUsuario() {
    this.router.navigate(['/usuarios/crear']);
  }

  editarUsuario(usuario: Usuario) {
    localStorage.setItem('usuarioLocal', JSON.stringify(usuario));
    this.router.navigate(['/usuarios/editar']);
  }

  eliminarUsuario(usuario: Usuario) {
    if (!confirm(`¿Eliminar el usuario ${usuario.nombre}?`)) return;

    const request: EliminarReactivarUsuarioRequest = {
      idUsuario: usuario.idUsuario,
      email: usuario.email
    };

    this.usuarioService.eliminarUsuario(request).subscribe({
      next: () => this.listarUsuarios(),
      error: (err) => console.error('Error al eliminar usuario:', err)
    });
  }

  reactivarUsuario(usuario: Usuario) {
    if (!confirm(`¿Reactivar el usuario ${usuario.nombre}?`)) return;

    const request: EliminarReactivarUsuarioRequest = {
      idUsuario: usuario.idUsuario,
      email: usuario.email
    };

    this.usuarioService.reactivarUsuario(request).subscribe({
      next: () => this.listarUsuarios(),
      error: (err) => console.error('Error al reactivar usuario:', err)
    });
  }

  // Search
  filtrar() {
    const texto = this.textoBusqueda.toLowerCase().trim();
    if (!texto) {
      this.listadoFiltrado = [...this.listadoUsuarios];
    } else {
      this.listadoFiltrado = this.listadoUsuarios.filter(u =>
        u.nombre.toLowerCase().includes(texto) ||
        u.email.toLowerCase().includes(texto) ||
        u.rol.toLowerCase().includes(texto)
      );
    }
    this.paginaActual = 1;
    this.calcularPaginacion();
  }

  limpiarBusqueda() {
    this.textoBusqueda = '';
    this.listadoFiltrado = [...this.listadoUsuarios];
    this.paginaActual = 1;
    this.calcularPaginacion();
  }

  // Pagination
  calcularPaginacion() {
    this.totalPaginas = Math.ceil(this.listadoFiltrado.length / this.registrosPorPagina);
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
    this.aplicarPagina();
  }

  aplicarPagina() {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.listadoPaginado = this.listadoFiltrado.slice(inicio, fin);
    this.cdr.detectChanges();
  }

  irAPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaActual = pagina;
    this.aplicarPagina();
  }

  paginaAnterior() { this.irAPagina(this.paginaActual - 1); }
  paginaSiguiente() { this.irAPagina(this.paginaActual + 1); }
}