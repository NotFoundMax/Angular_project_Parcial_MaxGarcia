import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.model';
import { UserRole } from '../interfaces/user-role.enum';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  // Datos simulados de usuarios
  private mockUsers: User[] = [
    { id: '1', nombre: 'Ana García', email: 'admin@correo.com', password: 'admin123', roles: [UserRole.ADMINISTRADOR], isActive: true },
    { id: '2', nombre: 'Carlos Méndez', email: 'manager@correo.com', password: 'manager123', roles: [UserRole.MANAGER], isActive: true },  
    { id: '3', nombre: 'Laura Rodríguez', email: 'ventas@correo.com', password: 'ventas123', roles: [UserRole.VENTAS], isActive: true },
    { id: '4', nombre: 'Miguel Torres', email: 'usuario@correo.com', password: 'usuario123', roles: [UserRole.USUARIO], isActive: true }
  ];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    let storedUser = null;

    if (isPlatformBrowser(this.platformId)) {
      storedUser = localStorage.getItem('currentUser');
    }

    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User | null> {
    return new Observable(observer => {
      setTimeout(() => {
        const user = this.mockUsers.find(u => u.email === email && u.password === password && u.isActive);

        if (user) {
          const userWithoutPassword = { ...user };
          delete (userWithoutPassword as any).password;

          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
          }

          this.currentUserSubject.next(userWithoutPassword);
          observer.next(userWithoutPassword);
        } else {
          observer.next(null);
        }

        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  hasRole(role: UserRole): boolean {
    const user = this.currentUserValue;
    return user ? user.roles.includes(role) : false;
  }

  hasAnyRole(roles: UserRole[]): boolean {
    const user = this.currentUserValue;
    return user ? roles.some(role => user.roles.includes(role)) : false;
  }

  isAuthenticated(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return this.currentUserValue !== null;
  }

  getAllUsers(): User[] {
    return this.mockUsers.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    });
  }

  register(userData: Omit<User, 'id' | 'isActive'>): Observable<User | null> {
    return new Observable(observer => {
      setTimeout(() => {
        const existingUser = this.mockUsers.find(u => u.email === userData.email);
        
        if (existingUser) {
          observer.next(null);
        } else {
          const newUser: User = {
            ...userData,
            id: (this.mockUsers.length + 1).toString(),
            isActive: true
          };
          
          this.mockUsers.push(newUser);
          const { password, ...userWithoutPassword } = newUser;
          observer.next(userWithoutPassword as User);
        }
        observer.complete();
      }, 1000);
    });
  }
}
