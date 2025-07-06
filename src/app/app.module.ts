import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { TablasComponent } from './componentes/tablas/tabla.component';
import { HomeComponent } from './componentes/home/home.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './componentes/footer/footer/footer.component';
import { DirectivesComponent } from './componentes/directives/directives.component';
import { GalleryComponent } from './componentes/gallery/gallery.component';
import { FetchingComponent } from './componentes/fetching/fetching.component';
import { ProductCardComponent } from './componentes/product/product-card/product-card.component';
import { ProductGridComponent } from './componentes/product/product-grid/product-grid.component';
import { VerClienteComponent } from './modales/ver-cliente/ver-cliente.component';
import { CrearClienteComponent } from './modales/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './modales/editar-cliente/editar-cliente.component';





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
    CrearClienteComponent,
    EditarClienteComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
