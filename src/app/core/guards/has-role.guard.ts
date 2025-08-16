import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../servicios/auth.service';
import { UserRole } from '../modelos/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const allowedRoles = route.data['roles'] as UserRole[];

    return this.authService.currentUser$.pipe(
      map(user => {
        if (!user) {
          // Si no está autenticado, redirigir a login
          return this.router.createUrlTree(['/auth/login']);
        }

        if (!allowedRoles || allowedRoles.length === 0) {
          // Si no se especifican roles, permitir acceso
          return true;
        }

        // Verificar si el usuario tiene alguno de los roles permitidos
        const hasRequiredRole = allowedRoles.some(role => user.roles.includes(role));
        
        if (hasRequiredRole) {
          return true;
        } else {
          // Si no tiene los roles necesarios, redirigir a página de acceso denegado o home
          return this.router.createUrlTree(['/']);
        }
      })
    );
  }

  canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.canActivate(route);
  }
}
