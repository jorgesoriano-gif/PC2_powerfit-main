import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Definimos la estructura del Perfil del usuario
export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  clave: string;
  telefono: string;
  direccion: string;
  nivel: string;
  puntos: number;
  imagen: string;
}

// Definimos la estructura del Historial de compras
export interface Orden {
  id: string;
  usuarioId: string;
  fecha: string;
  descripcion: string;
  detalles: string;
  total: number;
  estado: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Las rutas hacia tu db.json
  private usersUrl = 'http://localhost:3000/usuarios';
  private ordersUrl = 'http://localhost:3000/historial_compras';

  constructor(private http: HttpClient) { }

  // Buscar usuario por correo para el login
  getUsuarioPorCorreo(
    correo: string
  ): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(
      `${this.usersUrl}?correo=${encodeURIComponent(correo)}`
    );
  }

  // Obtener el perfil del usuario que inició sesión
  getUsuarioPorId(
    id: string
  ): Observable<Usuario> {

    return this.http.get<Usuario>(
      `${this.usersUrl}/${id}`
    );
  }

  // Actualizar exclusivamente al usuario logueado
  actualizarPerfil(
    id: string,
    datos: Partial<Usuario>
  ): Observable<Usuario> {

    return this.http.patch<Usuario>(
      `${this.usersUrl}/${id}`,
      datos
    );
  }

  // Historial correspondiente al usuario logueado
  getHistorialCompras(
    usuarioId: string
  ): Observable<Orden[]> {

    return this.http.get<Orden[]>(
      `${this.ordersUrl}?usuarioId=${encodeURIComponent(usuarioId)}`
    );
  }
}