import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../servidor/usuario.service';
import { InsertarUsuarioRequest } from '../../../models/usuarios/insertar-usuario-request';

@Component({
  selector: 'app-crear-usuario',
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent {

  guardando = false;
  errorMsg = '';

  usuarioRequest: InsertarUsuarioRequest = {
    tenantId: '',
    nombre: '',
    email: '',
    password: '',
    rol: 'OPERADOR'
  };

  roles = ['ADMIN', 'OPERADOR', 'VIEWER'];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  guardar() {
    this.guardando = true;
    this.errorMsg = '';

    this.usuarioService.insertarUsuario(this.usuarioRequest).subscribe({
      next: (response) => {
        this.guardando = false;
        if (!response) {
          this.errorMsg = 'No se recibio respuesta del servidor.';
          this.cdr.detectChanges();
          return;
        }
        if (response.success) {
          this.router.navigate(['/usuarios/listar']);
        } else {
          this.errorMsg = response.message || 'Error al crear el usuario.';
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        this.guardando = false;
        this.errorMsg = 'Error al crear el usuario. Verifica los datos.';
        console.error('Error al crear usuario:', err);
        this.cdr.detectChanges();
      }
    });
  }

  cancelar() {
    this.router.navigate(['/usuarios/listar']);
  }
}