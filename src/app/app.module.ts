import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { HomeComponent } from './pages/outer/home/home.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './componentes/footer/footer/footer.component';
import { DirectivesComponent } from './pages/inner/directives/directives.component';
import { GalleryComponent } from './pages/outer/gallery/gallery.component';
import { FetchingComponent } from './pages/inner/fetching/fetching.component';
import { ProductCardComponent } from './componentes/product/product-card/product-card.component';
import { ProductGridComponent } from './componentes/product/product-grid/product-grid.component';
import { VerClienteComponent } from './modales/cliente/ver-cliente/ver-cliente.component';
import { CrearClienteComponent } from './modales/cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './modales/cliente/editar-cliente/editar-cliente.component';
import { ListaProductosComponent } from './componentes/lista-productos/lista-productos.component';
import { HttpClientModule } from '@angular/common/http';
import { TablaProductoComponent } from './pages/inner/tablas/tabla-producto/tabla-producto.component';
import { TablaClienteComponent } from './pages/inner/tablas/tabla-cliente/tabla-cliente.component';
import { TablasComponent } from './pages/inner/tablas/tablas.component';
import { CrearProductoComponent } from './modales/producto/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './modales/producto/editar-producto/editar-producto.component';
import { VerProductoComponent } from './modales/producto/ver-producto/ver-producto.component';
import { CartModalComponent } from './componentes/cart-modal/cart-modal.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ContactComponent } from './pages/outer/contact/contact.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { DashboardComponent } from './pages/inner/dashboard/dashboard.component';
import { AuthComponent } from './pages/outer/auth/auth.component';
import { ToastComponent } from './componentes/toast/toast.component';


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
export class AppModule { }
