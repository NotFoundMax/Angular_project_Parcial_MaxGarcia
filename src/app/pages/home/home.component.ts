import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * Componente standalone para la página principal del Marketplace de Experiencias Espaciales
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  formularioContacto: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicialización del formulario de contacto con validaciones
    this.formularioContacto = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Experiencias espaciales disponibles
  productos = [
    { 
      nombre: 'Viaje a las Estrellas', 
      descripcion: 'Una experiencia inmersiva para explorar constelaciones lejanas y descubrir secretos del universo', 
      imagen: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=400&fit=crop',
      precio: '$2,999',
      duracion: '7 días',
      categoria: 'Exploración Galáctica',
      rating: 4.9
    },
    { 
      nombre: 'Caminata Lunar', 
      descripcion: 'Experimenta la gravedad lunar y camina por cráteres mientras observas la Tierra desde el espacio', 
      imagen: 'https://images.unsplash.com/photo-1518066431836-dcf0a105c4ea?w=400&h=400&fit=crop',
      precio: '$4,599',
      duracion: '3 días',
      categoria: 'Aventura Lunar',
      rating: 4.8
    },
    { 
      nombre: 'Aurora Boreal Espacial', 
      descripcion: 'Observa las auroras desde el espacio exterior en una experiencia única y mágica', 
      imagen: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=400&fit=crop',
      precio: '$1,899',
      duracion: '2 días',
      categoria: 'Fenómenos Cósmicos',
      rating: 5.0
    },
    { 
      nombre: 'Estación Espacial ISS', 
      descripcion: 'Vive como un astronauta en la Estación Espacial Internacional con actividades científicas', 
      imagen: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop',
      precio: '$12,999',
      duracion: '14 días',
      categoria: 'Ciencia Espacial',
      rating: 4.7
    },
    { 
      nombre: 'Nebulosa del Águila', 
      descripcion: 'Explora la majestuosa Nebulosa del Águila y presencia el nacimiento de nuevas estrellas', 
      imagen: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=400&fit=crop',
      precio: '$8,499',
      duracion: '10 días',
      categoria: 'Exploración Profunda',
      rating: 4.9
    },
    { 
      nombre: 'Marte Expedición', 
      descripcion: 'Una aventura épica al planeta rojo con exploración de cañones y montañas marcianas', 
      imagen: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&h=400&fit=crop',
      precio: '$25,999',
      duracion: '30 días',
      categoria: 'Planeta Rojo',
      rating: 4.6
    }
  ];

  // Blog de experiencias espaciales
  postsBlog = [
    { 
      titulo: 'Los Secretos de la Vía Láctea', 
      resumen: 'Descubre los misterios ocultos de nuestra galaxia y las últimas investigaciones astronómicas', 
      imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', 
      enlace: '#',
      autor: 'Dr. Elena Cosmos',
      fecha: '15 Enero 2025'
    },
    { 
      titulo: 'Vida en Exoplanetas: ¿Realidad o Ficción?', 
      resumen: 'Un análisis profundo sobre la posibilidad de vida en planetas fuera de nuestro sistema solar', 
      imagen: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=400&h=300&fit=crop', 
      enlace: '#',
      autor: 'Prof. Marcus Stellar',
      fecha: '12 Enero 2025'
    },
    { 
      titulo: 'Tecnología de Propulsión Galáctica', 
      resumen: 'Los avances más recientes en tecnología que nos permitirán viajar más lejos en el espacio', 
      imagen: 'https://images.unsplash.com/photo-1457364983758-510f8afa9f5f?w=400&h=300&fit=crop', 
      enlace: '#',
      autor: 'Ing. Sofia Nebula',
      fecha: '10 Enero 2025'
    }
  ];

  // Estadísticas del marketplace
  estadisticas = [
    { numero: '50K+', descripcion: 'Exploradores Estelares', icono: '👨‍🚀' },
    { numero: '200+', descripcion: 'Experiencias Únicas', icono: '🌌' },
    { numero: '99.8%', descripcion: 'Satisfacción Galáctica', icono: '⭐' },
    { numero: '25', descripcion: 'Planetas Explorados', icono: '🪐' }
  ];

  navegarASeccion(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  enviarFormulario() {
    if (this.formularioContacto.valid) {
      console.log('Formulario enviado:', this.formularioContacto.value);
      // Aquí iría la lógica para enviar los datos a un backend
      this.formularioContacto.reset();
    }
  }

  // Método para obtener las estrellas de rating
  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => rating > i);
  }
}
