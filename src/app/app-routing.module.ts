// Configuración de rutas principales
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TablasComponent } from './pages/tablas/tablas.component';
import { DirectivesComponent } from './pages/directives/directives.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { FetchingComponent } from './pages/fetching/fetching.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'directives', component: DirectivesComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'tablas', component: TablasComponent },
  { path: 'fetching', component: FetchingComponent },
  { path: '**', redirectTo: 'home' },
  { path: '', component: HomeComponent }, // ruta por defecto
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
