import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser'; // ++Importado para sanitización XSS para proteger los inputs y outputsdinamicos antes de mostrarlos, por ejemplo el nombre del usuario en el modal.
import { debounceTime } from 'rxjs/operators'; // ++Importado para limitar peticiones DDoS para proteger contra ataques de fuerza bruta.


@Component({
  selector: 'app-auth',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class AuthComponent implements OnInit {
  isLoading = false;
  returnUrl = '/';
  csrfToken: string | null = localStorage.getItem('csrfToken'); // ++Almacena token CSRF que impide ataques

  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer // ++Inyectado para sanitizar inputs XSS
  ) { }

  ngOnInit(): void {
    // Obtener la URL de retorno o usar '/' por defecto
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    // Si ya está autenticado, redirigir
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  // Sanitiza el email para prevenir XSS (escapa caracteres maliciosos)
  sanitizeInput(input: string): string {
    return this.sanitizer.sanitize(1, input) || ''; //++ 1 = SecurityContext.HTML
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.isLoading = true;

      // Verifica que el token CSRF esté presente antes de enviar (protección CSRF)
      if (!this.csrfToken) {
        Swal.fire({
          title: 'Error de Seguridad',
          text: 'Token CSRF no encontrado. Por favor, recarga la página.',
          icon: 'error',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#ef4444',
          background: 'rgba(15, 23, 42, 0.95)',
          color: '#f8fafc'
        });
        this.isLoading = false;
        return;
      }

      //++ Aplica debounce para limitar solicitudes y mitigar DDoS (500ms de retraso)
      this.authService.login(this.sanitizeInput(this.loginData.email), this.loginData.password)
        .pipe(debounceTime(500))
        .subscribe({
          next: (user) => {
            this.isLoading = false;
            
            if (user) {
              Swal.fire({
                title: '¡Bienvenido!',
                text: `Hola ${this.sanitizeInput(user.nombre)}, has iniciado sesión exitosamente.`, // ++Sanitiza nombre para XSS
                icon: 'success',
                confirmButtonText: 'Continuar',
                confirmButtonColor: '#6366f1',
                background: 'rgba(15, 23, 42, 0.95)',
                color: '#f8fafc',
                timer: 2000
              }).then(() => {
                this.router.navigate([this.returnUrl]);
              });
            } else {
              Swal.fire({
                title: 'Error de Autenticación',
                text: 'Credenciales incorrectas. Verifica tu email y contraseña.',
                icon: 'error',
                confirmButtonText: 'Reintentar',
                confirmButtonColor: '#ef4444',
                background: 'rgba(15, 23, 42, 0.95)',
                color: '#f8fafc'
              });
            }
          },
          error: (error) => {
            this.isLoading = false;
            Swal.fire({
              title: 'Error del Sistema',
              text: 'Ocurrió un error inesperado. Por favor, intenta nuevamente.',
              icon: 'error',
              confirmButtonText: 'Entendido',
              confirmButtonColor: '#ef4444',
              background: 'rgba(15, 23, 42, 0.95)',
              color: '#f8fafc'
            });
          }
        });
    }
  }
}