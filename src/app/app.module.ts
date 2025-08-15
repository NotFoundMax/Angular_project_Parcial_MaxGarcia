import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './componentes/footer/footer/footer.component';
import { DirectivesComponent } from './pages/directives/directives.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { FetchingComponent } from './pages/fetching/fetching.component';
import { ProductCardComponent } from './componentes/product/product-card/product-card.component';
import { ProductGridComponent } from './componentes/product/product-grid/product-grid.component';
import { VerClienteComponent } from './modales/cliente/ver-cliente/ver-cliente.component';
import { CrearClienteComponent } from './modales/cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './modales/cliente/editar-cliente/editar-cliente.component';
import { ListaProductosComponent } from './componentes/lista-productos/lista-productos.component';
import { HttpClientModule } from '@angular/common/http';
import { TablaProductoComponent } from './pages/tablas/tabla-producto/tabla-producto.component';
import { TablaClienteComponent } from './pages/tablas/tabla-cliente/tabla-cliente.component';
import { TablasComponent } from './pages/tablas/tablas.component';
import { CrearProductoComponent } from './modales/producto/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './modales/producto/editar-producto/editar-producto.component';
import { VerProductoComponent } from './modales/producto/ver-producto/ver-producto.component';


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
