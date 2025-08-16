import { Directive, Input, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { UserRole } from '../modelos/user-role.enum';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnDestroy {
  private subscription!: Subscription;
  private requiredRoles: UserRole[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    // Suscribirse a cambios en el usuario actual
    this.subscription = this.authService.currentUser$.subscribe(user => {
      this.updateView();
    });
  }

  @Input() set appHasRole(roles: UserRole | UserRole[]) {
    // Convertir a array si es un solo rol
    this.requiredRoles = Array.isArray(roles) ? roles : [roles];
    this.updateView();
  }

  private updateView(): void {
    const user = this.authService.currentUserValue;
    
    // Limpiar la vista
    this.viewContainer.clear();

    if (user && this.hasRequiredRole(user.roles)) {
      // Si el usuario tiene el rol requerido, mostrar el contenido
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    // Si no tiene el rol, no mostrar nada (la vista ya está limpia)
  }

  private hasRequiredRole(userRoles: UserRole[]): boolean {
    if (!this.requiredRoles || this.requiredRoles.length === 0) {
      return true; // Si no se especifican roles, mostrar por defecto
    }

    // Verificar si el usuario tiene alguno de los roles requeridos
    return this.requiredRoles.some(role => userRoles.includes(role));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
