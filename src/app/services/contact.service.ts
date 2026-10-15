import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Definimos la estructura de los mensajes
export interface MensajeContacto {
  id?: string;
  nombre: string;
  correo: string;
  asunto: string;
  mensaje: string;
  fecha: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  // La ruta de tu base de datos para los mensajes
  private apiUrl = 'http://localhost:3000/mensajes';

  constructor(private http: HttpClient) {}

  // Función POST para guardar el mensaje en db.json
  enviarMensaje(mensaje: MensajeContacto): Observable<MensajeContacto> {
    return this.http.post<MensajeContacto>(this.apiUrl, mensaje);
  }
}