import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../../../core/services/customers.service';
import { AuthService } from '../../../../auth/auth.service';
import { User } from '../../../../interfaces/user.model';
import { UserRole } from '../../../../interfaces/user-role.enum';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartCount = 0;
  showCartModal = false;
  currentUser: User | null = null;
  showUserSelection = false;
  showLoginOptions = false;
  private cartCountSubscription: Subscription = new Subscription();
  private userSubscription: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartCountSubscription = this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    this.cartCountSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  toggleCartModal(): void {
    if (this.cartCount === 0) {
      // Si el carrito está vacío, ir directamente a la galería
      this.router.navigate(['/gallery']);
      return;
    }
    this.showCartModal = !this.showCartModal;
  }

  closeCartModal(): void {
    this.showCartModal = false;
  }

  goToCheckout(): void {
    this.closeCartModal();
    this.router.navigate(['/checkout']);
  }

  // Métodos para verificar roles
  hasRole(role: UserRole): boolean {
    return this.authService.hasRole(role);
  }

  hasAnyRole(roles: UserRole[]): boolean {
    return this.authService.hasAnyRole(roles);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Método para logout
  logout(): void {
    this.authService.logout();
  }

  // Método para mostrar opciones de login
  toggleLoginOptions(): void {
    this.showLoginOptions = !this.showLoginOptions;
    this.showUserSelection = false;
  }

  // Método para ir a login
  goToLogin(): void {
    this.showLoginOptions = false;
    this.showUserSelection = false;
    this.router.navigate(['/auth/login']);
  }

  // Getter para UserRole enum (para usar en template)
  get UserRole() {
    return UserRole;
  }

  // Método para obtener el saludo según el rol
  getGreeting(): string {
    if (!this.currentUser) return '';

    const firstName = this.currentUser.nombre.split(' ')[0];
    if (this.hasRole(UserRole.ADMINISTRADOR)) {
      return `Hola, ${firstName} (Admin)`;
    } else if (this.hasRole(UserRole.MANAGER)) {
      return `Hola, ${firstName} (Manager)`;
    } else if (this.hasRole(UserRole.VENTAS)) {
      return `Hola, ${firstName} (Ventas)`;
    } else {
      return `Hola, ${firstName}`;
    }
  }

  // Método para login rápido
  quickLogin(email: string): void {
    const passwords: { [key: string]: string } = {
      'admin@correo.com': 'admin123',
      'manager@correo.com': 'manager123',
      'ventas@correo.com': 'ventas123',
      'usuario@correo.com': 'usuario123'
    };

    const password = passwords[email];
    if (password) {
      this.authService.login(email, password).subscribe(user => {
        if (user) {
          this.showUserSelection = false;
          this.router.navigate(['/']);
        }
      });
    }
  }
}
