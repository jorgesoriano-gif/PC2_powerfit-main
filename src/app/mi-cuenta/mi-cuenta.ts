import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, Usuario, Orden } from '../services/user.service'; // Importamos el servicio
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mi-cuenta.html',
  styleUrl: './mi-cuenta.css',
})
export class MiCuenta implements OnInit {
  // Variables para almacenar los datos de db.json
  perfil: Usuario | null = null;
  historial: Orden[] = [];
  cargando = true;
  editando = false;
  guardando = false;

  mensajeExito = '';
  mensajeError = '';

  formularioPerfil = {
    nombre: '',
    telefono: '',
    direccion: '',
  };

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const sesion = localStorage.getItem('usuario');

    if (!sesion) {
      this.router.navigate(['/login']);

      return;
    }

    const usuarioSesion = JSON.parse(sesion);

    this.cargarDatos(usuarioSesion.id);
  }

  cargarDatos(usuarioId: string): void {
    forkJoin({
      perfil: this.userService.getUsuarioPorId(usuarioId),

      historial: this.userService.getHistorialCompras(usuarioId),
    }).subscribe({
      next: ({ perfil, historial }) => {
        this.perfil = perfil;
        this.historial = historial;

        this.cargando = false;

        this.cdr.markForCheck();
      },

      error: (error) => {
        console.error('Error cargando Mi Cuenta:', error);

        this.cargando = false;

        this.cdr.markForCheck();
      },
    });
  }

  activarEdicion(): void {
    if (!this.perfil) {
      return;
    }

    this.formularioPerfil = {
      nombre: this.perfil.nombre,
      telefono: this.perfil.telefono,
      direccion: this.perfil.direccion,
    };

    this.mensajeExito = '';
    this.mensajeError = '';

    this.editando = true;
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.mensajeError = '';
  }

  guardarPerfil(): void {
    if (
      !this.formularioPerfil.nombre.trim() ||
      !this.formularioPerfil.telefono.trim() ||
      !this.formularioPerfil.direccion.trim()
    ) {
      this.mensajeError = 'Completa todos los campos';

      return;
    }

    this.guardando = true;
    this.mensajeError = '';

    if (!this.perfil) {
      return;
    }

    this.userService
      .actualizarPerfil(this.perfil.id, {
        nombre: this.formularioPerfil.nombre.trim(),

        telefono: this.formularioPerfil.telefono.trim(),

        direccion: this.formularioPerfil.direccion.trim(),
      })
      .subscribe({
        next: (perfilActualizado) => {
          this.perfil = perfilActualizado;

          /*
           * También actualizamos el nombre
           * guardado en la sesión.
           */
          const sesion = localStorage.getItem('usuario');

          if (sesion) {
            const usuarioSesion = JSON.parse(sesion);

            usuarioSesion.nombre = perfilActualizado.nombre;

            localStorage.setItem('usuario', JSON.stringify(usuarioSesion));
          }

          this.guardando = false;
          this.editando = false;

          this.mensajeExito = 'Perfil actualizado correctamente';

          this.cdr.markForCheck();
        },

        error: (error) => {
          console.error('Error actualizando perfil:', error);

          this.guardando = false;

          this.mensajeError = 'No se pudo actualizar el perfil';

          this.cdr.markForCheck();
        },
      });
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
