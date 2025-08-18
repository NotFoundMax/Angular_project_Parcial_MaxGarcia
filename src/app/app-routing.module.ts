// Configuración de rutas principales
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/outer/pages/home/home.component';
import { TablasComponent } from './modules/inner/pages/admin/admin';
import { DirectivesComponent } from './modules/inner/pages/directivas/orders';
import { GalleryComponent } from './modules/outer/pages/gallery/gallery.component';
import { FetchingComponent } from './modules/inner/pages/reports/reports';
import { CheckoutComponent } from './modules/outer/pages/checkout/checkout.component';
import { ContactComponent } from './modules/outer/pages/customers/contact.component';
import { AuthComponent } from './auth/login';
import { DashboardComponent } from './modules/inner/pages/dashboard/dashboard';

// Guards
import { AuthGuard } from './core/guards/auth.guard';
import { HasRoleGuard } from './core/guards/has-role.guard';

// Enums
import { UserRole } from './interfaces/user-role.enum';

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
    data: { roles: [UserRole.ADMINISTRADOR, UserRole.MANAGER] }
  },
  {
    path: 'tablas',
    component: TablasComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { roles: [UserRole.ADMINISTRADOR, UserRole.MANAGER, UserRole.VENTAS] }
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
