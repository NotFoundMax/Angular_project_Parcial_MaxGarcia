import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../modelos/user.model';
import { UserRole } from '../modelos/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  // Datos simulados de usuarios
  private mockUsers: User[] = [
    {
      id: '1',
      nombre: 'Ana García',
      email: 'admin@stellarx.space',
      password: 'admin123',
      roles: [UserRole.ADMINISTRADOR],
      isActive: true,
      avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      nombre: 'Carlos Méndez',
      email: 'manager@stellarx.space',
      password: 'manager123',
      roles: [UserRole.MANAGER],
      isActive: true,
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      nombre: 'Laura Rodríguez',
      email: 'ventas@stellarx.space',
      password: 'ventas123',
      roles: [UserRole.VENTAS],
      isActive: true,
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '4',
      nombre: 'Miguel Torres',
      email: 'usuario@stellarx.space',
      password: 'usuario123',
      roles: [UserRole.USUARIO],
      isActive: true,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '5',
      nombre: 'Sofia López',
      email: 'super@stellarx.space',
      password: 'super123',
      roles: [UserRole.ADMINISTRADOR, UserRole.VENTAS],
      isActive: true,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '6',
      nombre: 'David Martín',
      email: 'manager.ventas@stellarx.space',
      password: 'managerventas123',
      roles: [UserRole.MANAGER, UserRole.VENTAS],
      isActive: true,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    }
  ];

  constructor(private router: Router) {
    // Inicializar con usuario del localStorage si existe
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // Getter para obtener el valor actual del usuario
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Método de login
  login(email: string, password: string): Observable<User | null> {
    return new Observable(observer => {
      // Simular delay de API
      setTimeout(() => {
        const user = this.mockUsers.find(u => 
          u.email === email && 
          u.password === password && 
          u.isActive
        );

        if (user) {
          // Crear una copia del usuario sin la contraseña
          const userWithoutPassword = { ...user };
          delete (userWithoutPassword as any).password;

          // Guardar en localStorage y actualizar subject
          localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
          this.currentUserSubject.next(userWithoutPassword);
          
          observer.next(userWithoutPassword);
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  }

  // Método de logout
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  // Verificar si el usuario tiene un rol específico
  hasRole(role: UserRole): boolean {
    const user = this.currentUserValue;
    return user ? user.roles.includes(role) : false;
  }

  // Verificar si el usuario tiene alguno de los roles especificados
  hasAnyRole(roles: UserRole[]): boolean {
    const user = this.currentUserValue;
    return user ? roles.some(role => user.roles.includes(role)) : false;
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }

  // Obtener todos los usuarios (para desarrollo/testing)
  getAllUsers(): User[] {
    return this.mockUsers.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    });
  }

  // Simular registro de usuario
  register(userData: Omit<User, 'id' | 'isActive'>): Observable<User | null> {
    return new Observable(observer => {
      setTimeout(() => {
        // Verificar si el email ya existe
        const existingUser = this.mockUsers.find(u => u.email === userData.email);
        
        if (existingUser) {
          observer.next(null); // Email ya existe
        } else {
          const newUser: User = {
            ...userData,
            id: (this.mockUsers.length + 1).toString(),
            isActive: true
          };
          
          this.mockUsers.push(newUser);
          
          // Crear copia sin contraseña
          const { password, ...userWithoutPassword } = newUser;
          observer.next(userWithoutPassword as User);
        }
        observer.complete();
      }, 1000);
    });
  }
}
