import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  usuario = '';
  clave = '';

  mensajeError = '';

  cargando = false;
  mostrarClave = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
  ) { }

  iniciarSesion(): void {
    if (!this.usuario.trim() || !this.clave.trim()) {
      this.mensajeError = 'Completa todos los campos';

      return;
    }

    this.cargando = true;
    this.mensajeError = '';

    this.userService.getUsuarioPorCorreo(this.usuario.trim()).subscribe({
      next: (usuarios) => {
        const perfil = usuarios[0];

        if (perfil && this.clave === perfil.clave) {
          const usuarioSesion = {
            id: perfil.id,
            nombre: perfil.nombre,
            correo: perfil.correo,
            nivel: perfil.nivel,
          };

          localStorage.setItem('usuario', JSON.stringify(usuarioSesion));

          this.cargando = false;

          this.cdr.markForCheck();

          this.router.navigate(['/dashboard']);
        } else {
          this.cargando = false;

          this.mensajeError = 'Correo o contraseña incorrectos';

          this.cdr.markForCheck();
        }
      },

      error: (error) => {
        console.error('Error al iniciar sesión:', error);

        this.cargando = false;

        this.mensajeError = 'No se pudo conectar con el servidor';

        this.cdr.markForCheck();
      },
    });
  }

  toggleClave(): void {
    this.mostrarClave = !this.mostrarClave;
  }
}
