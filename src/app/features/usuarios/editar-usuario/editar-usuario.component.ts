import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../servidor/usuario.service';
import { ActualizarUsuarioRequest } from '../../../models/usuarios/actualizar-usuario-request';
import { Usuario } from '../../../models/usuarios/usuario';

@Component({
  selector: 'app-editar-usuario',
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit {

  guardando = false;
  errorMsg = '';
  roles = ['ADMIN', 'OPERADOR', 'VIEWER'];

  usuarioRequest: ActualizarUsuarioRequest = {
    idUsuario: '',
    nombre: '',
    email: '',
    password: '',
    rol: ''
  };

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const usuarioLocal = localStorage.getItem('usuarioLocal');

    if (!usuarioLocal) {
      this.router.navigate(['/usuarios/listar']);
      return;
    }

    const usuario = JSON.parse(usuarioLocal) as Usuario;

    this.usuarioRequest = {
      idUsuario: usuario.idUsuario,
      nombre: usuario.nombre,
      email: usuario.email,
      password: '',
      rol: usuario.rol
    };
  }

  guardar() {
    this.guardando = true;
    this.errorMsg = '';

    this.usuarioService.actualizarUsuario(this.usuarioRequest).subscribe({
      next: (response) => {
        this.guardando = false;
        if (!response) {
          this.errorMsg = 'No se recibio respuesta del servidor.';
          this.cdr.detectChanges();
          return;
        }
        if (response.success) {
          localStorage.removeItem('usuarioLocal');
          this.router.navigate(['/usuarios/listar']);
        } else {
          this.errorMsg = response.message || 'Error al actualizar el usuario.';
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        this.guardando = false;
        this.errorMsg = 'Error al actualizar el usuario. Verifica los datos.';
        console.error('Error al actualizar usuario:', err);
        this.cdr.detectChanges();
      }
    });
  }

  cancelar() {
    localStorage.removeItem('usuarioLocal');
    this.router.navigate(['/usuarios/listar']);
  }
}