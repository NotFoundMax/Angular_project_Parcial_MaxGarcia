import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  subscribeToNewsletter(event: Event): void {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
    const email = emailInput.value.trim();

    if (!email) {
      Swal.fire({
        title: 'Email Requerido',
        text: 'Por favor ingresa tu email para suscribirte a nuestras transmisiones espaciales.',
        icon: 'warning',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#6366f1',
        background: '#1e293b',
        color: '#f1f5f9'
      });
      return;
    }

    if (!this.isValidEmail(email)) {
      Swal.fire({
        title: 'Email Inválido',
        text: 'Por favor ingresa un email válido para recibir nuestras transmisiones.',
        icon: 'error',
        confirmButtonText: 'Corregir',
        confirmButtonColor: '#6366f1',
        background: '#1e293b',
        color: '#f1f5f9'
      });
      return;
    }

    // Simulate subscription success
    Swal.fire({
      title: '🚀 ¡Suscripción Exitosa!',
      html: `
        <div class="text-center">
          <p class="mb-3">¡Bienvenido a la comunidad galáctica!</p>
          <p class="mb-3">Hemos enviado una confirmación a <strong class="text-yellow-400">${email}</strong></p>
          <p>Prepárate para recibir las transmisiones más fascinantes del cosmos.</p>
        </div>
      `,
      icon: 'success',
      confirmButtonText: 'Explorar el Cosmos',
      confirmButtonColor: '#6366f1',
      background: '#1e293b',
      color: '#f1f5f9'
    });

    // Clear the form
    emailInput.value = '';
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
