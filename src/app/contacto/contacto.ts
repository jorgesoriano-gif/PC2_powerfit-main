import { Component, ChangeDetectorRef } from '@angular/core'; // <-- Importamos ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService, MensajeContacto } from '../services/contact.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {
  datosFormulario = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  };

  enviando = false;
  mensajeExito = '';
  mensajeError = '';

  // Inyectamos el servicio y el detector de cambios
  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef 
  ) {}

  enviarFormulario() {
    if (!this.datosFormulario.nombre || !this.datosFormulario.correo || !this.datosFormulario.mensaje) {
      this.mensajeError = 'Por favor, completa los campos obligatorios marcados.';
      return;
    }

    this.enviando = true;
    this.mensajeError = '';

    const nuevoMensaje: MensajeContacto = {
      ...this.datosFormulario,
      fecha: new Date()
    };

    this.contactService.enviarMensaje(nuevoMensaje).subscribe({
      next: (res) => {
        this.enviando = false;
        this.mensajeExito = '¡Mensaje recibido! El Escuadrón Técnico de PowerFit te contactará en breve.';
        this.datosFormulario = { nombre: '', correo: '', asunto: '', mensaje: '' };
        
        this.cdr.markForCheck(); // <-- Forzamos a Angular a actualizar la interfaz

        setTimeout(() => {
          this.mensajeExito = '';
          this.cdr.markForCheck(); // <-- Forzamos actualización al quitar el mensaje
        }, 5000);
      },
      error: (err) => {
        this.enviando = false;
        this.mensajeError = 'Fallo de conexión. No pudimos enviar tu mensaje a la base de datos.';
        console.error('Error al enviar el mensaje:', err);
        
        this.cdr.markForCheck(); // <-- Forzamos actualización para mostrar el error
      }
    });
  }
}