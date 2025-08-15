import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoading = false;
  returnUrl = '/';
  
  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Obtener la URL de retorno o usar '/' por defecto
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    // Si ya está autenticado, redirigir
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.isLoading = true;
      
      this.authService.login(this.loginData.email, this.loginData.password)
        .subscribe({
          next: (user) => {
            this.isLoading = false;
            
            if (user) {
              Swal.fire({
                title: '¡Bienvenido!',
                text: `Hola ${user.nombre}, has iniciado sesión exitosamente.`,
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

  // Método para login rápido con usuarios de prueba
  quickLogin(email: string): void {
    const passwords: { [key: string]: string } = {
      'admin@stellarx.space': 'admin123',
      'manager@stellarx.space': 'manager123',
      'ventas@stellarx.space': 'ventas123',
      'usuario@stellarx.space': 'usuario123',
      'manager.ventas@stellarx.space': 'managerventas123'
    };

    this.loginData.email = email;
    this.loginData.password = passwords[email];
  }
}
