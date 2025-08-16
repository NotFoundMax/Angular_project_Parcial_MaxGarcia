import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/inner/components/header.component';
import { HomeComponent } from './modules/outer/pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './modules/outer/components/footer/footer.component';
import { DirectivesComponent } from './modules/inner/pages/orders/directives.component';
import { GalleryComponent } from './modules/outer/pages/gallery/gallery.component';
import { FetchingComponent } from './modules/inner/pages/reports/fetching.component';
import { ProductCardComponent } from './modules/outer/components/product-details/product-card.component';
import { ProductGridComponent } from './modules/outer/components/view-card/product-grid.component';
import { VerClienteComponent } from './modules/outer/components/user-profile/ver-cliente.component';
import { CrearClienteComponent } from './modules/outer/components/user-profile/crear-cliente.component';
import { EditarClienteComponent } from './modules/outer/components/user-profile/editar-cliente.component';
import { ListaProductosComponent } from './modules/outer/components/post-form/lista-productos.component';
import { HttpClientModule } from '@angular/common/http';
import { TablaProductoComponent } from './modules/outer/pages/directives/tabla-producto.component';
import { TablaClienteComponent } from './modules/outer/pages/tables/tabla-cliente.component';
import { TablasComponent } from './modules/inner/pages/admin/tablas.component';
import { CrearProductoComponent } from './modales/producto/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './modales/producto/editar-producto/editar-producto.component';
import { VerProductoComponent } from './modales/producto/ver-producto/ver-producto.component';
import { CartModalComponent } from './modules/outer/components/modal/cart-modal.component';
import { CheckoutComponent } from './modules/outer/pages/login/checkout.component';
import { ContactComponent } from './modules/outer/pages/customers/contact.component';
import { HasRoleDirective } from './core/hasRole.directive';
import { DashboardComponent } from './modules/inner/pages/dashboard/dashboard.component';
import { AuthComponent } from './auth/login';
import { ToastComponent } from './modules/outer/components/profile-photo/toast.component';
import { DomSanitizer } from '@angular/platform-browser'; // Angular provee proteccion integrada XSS 



@NgModule({
  declarations: [
    
    AppComponent,
    HeaderComponent,
    TablasComponent,
    DirectivesComponent,
    GalleryComponent,
    FetchingComponent,
    HomeComponent,
    FooterComponent,
    ProductCardComponent,
    ProductGridComponent,
    VerClienteComponent,
    VerProductoComponent,
    CrearClienteComponent,
    EditarClienteComponent,
    ListaProductosComponent,
    TablaProductoComponent,
    TablaClienteComponent,
    CrearProductoComponent,
    EditarProductoComponent,
    CartModalComponent,
    CheckoutComponent,
    ContactComponent,
    HasRoleDirective,
    DashboardComponent,
    AuthComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(private sanitizer: DomSanitizer) {
    // Angular provee proteccion integrada XSS 
  }
}
