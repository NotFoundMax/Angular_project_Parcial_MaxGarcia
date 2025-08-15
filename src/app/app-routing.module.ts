// Configuración de rutas principales
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/outer/home/home.component';
import { TablasComponent } from './pages/inner/tablas/tablas.component';
import { DirectivesComponent } from './pages/inner/directives/directives.component';
import { GalleryComponent } from './pages/outer/gallery/gallery.component';
import { FetchingComponent } from './pages/inner/fetching/fetching.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ContactComponent } from './pages/outer/contact/contact.component';
import { AuthComponent } from './pages/outer/auth/auth.component';
import { DashboardComponent } from './pages/inner/dashboard/dashboard.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { HasRoleGuard } from './guards/has-role.guard';

// Enums
import { UserRole } from './modelos/user-role.enum';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  // Rutas públicas
  { path: 'home', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'auth/login', component: AuthComponent },

  // Rutas para usuarios autenticados
  { 
    path: 'checkout', 
    component: CheckoutComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { roles: [UserRole.USUARIO] }
  },
  
  // Rutas administrativas
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { roles: [UserRole.ADMINISTRADOR, UserRole.MANAGER, UserRole.VENTAS] }
  },
  { 
    path: 'tablas', 
    component: TablasComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { roles: [UserRole.ADMINISTRADOR, UserRole.MANAGER] }
  },
  { 
    path: 'directives', 
    component: DirectivesComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { roles: [UserRole.ADMINISTRADOR] }
  },
  
  // Rutas de desarrollo/testing (opcional)
  { 
    path: 'fetching', 
    component: FetchingComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { roles: [UserRole.ADMINISTRADOR] }
  },
  
  // Redirección por defecto para rutas no encontradas
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
