import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  // Modelo para el formulario
  contactForm = {
    nombre: '',
    correo: '',
    mensaje: ''
  };

  constructor() { }

  // Método para enviar el formulario
  onSubmit(form: NgForm) {
    if (form.valid) {
      // Simular el envío del mensaje
      Swal.fire({
        title: '¡Mensaje Enviado!',
        text: `Gracias ${this.contactForm.nombre}, hemos recibido tu mensaje. Te contactaremos pronto a través del espacio cósmico.`,
        icon: 'success',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#6366f1',
        background: 'rgba(15, 23, 42, 0.95)',
        color: '#f8fafc',
        backdrop: `
          rgba(0,0,0,0.8)
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          center
          repeat
        `
      }).then(() => {
        // Limpiar el formulario después de la confirmación
        this.resetForm(form);
      });
    } else {
      // Mostrar error si el formulario no es válido
      Swal.fire({
        title: 'Error en Transmisión',
        text: 'Por favor, completa todos los campos antes de enviar tu mensaje al cosmos.',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#ef4444',
        background: 'rgba(15, 23, 42, 0.95)',
        color: '#f8fafc'
      });
    }
  }

  // Método para limpiar el formulario
  private resetForm(form: NgForm) {
    this.contactForm = {
      nombre: '',
      correo: '',
      mensaje: ''
    };
    form.resetForm();
  }
}
