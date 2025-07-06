// Configuración de rutas principales
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { TablasComponent } from './componentes/tablas/tabla.component';
import { DirectivesComponent } from './componentes/directives/directives.component';
import { GalleryComponent } from './componentes/gallery/gallery.component';
import { FetchingComponent } from './componentes/fetching/fetching.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'directives', component: DirectivesComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'tables', component: TablasComponent },
  { path: 'fetching', component: FetchingComponent },
  { path: '**', redirectTo: 'home' },
  { path: '', component: HomeComponent }, // ruta por defecto
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
