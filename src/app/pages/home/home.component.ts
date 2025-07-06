import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * Componente standalone para la página principal de Lumiki.pe
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

  productos = [
    { nombre: 'Producto 1', descripcion: 'Descripción 1', imagen: 'https://picsum.photos/400?random=1' },
    { nombre: 'Producto 2', descripcion: 'Descripción 2', imagen: 'https://picsum.photos/400?random=2' },
    { nombre: 'Producto 3', descripcion: 'Descripción 3', imagen: 'https://picsum.photos/400?random=3' }

  ];
  postsBlog = [
    { titulo: 'Post 1', resumen: 'Resumen 1', imagen: 'https://picsum.photos/400?random=4', enlace: '#' },
    { titulo: 'Post 2', resumen: 'Resumen 2', imagen: 'https://picsum.photos/400?random=5', enlace: '#' },
    { titulo: 'Post 2', resumen: 'Resumen 2', imagen: 'https://picsum.photos/400?random=6', enlace: '#' }
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

}

 
