import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/customers.service';
import { ToastService } from 'src/app/core/services/toast.service';

// Interfaz para definir la estructura de un producto
interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;
  duracion: string;
}

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
})
export class ProductGridComponent {
  // Variables para el modal
  mostrarModal = false;
  productoSeleccionado: Producto | null = null;

  constructor(
    private cartService: CartService,
    private toastService: ToastService
  ) {}
  // Lista de experiencias espaciales
  productos: Producto[] = [
    {
      nombre: 'Experiencia 1',
      descripcion: 'Viaje inmersivo a las constelaciones más lejanas del universo conocido.',
      precio: 120050,
      imagen: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop',
      categoria: 'Aventura',
      duracion: '3 días',
    },
    {
      nombre: 'Experiencia 2',
      descripcion: 'Caminata lunar con tecnología de gravedad artificial avanzada.',
      precio: 180099,
      imagen: 'https://images.pexels.com/photos/21287308/pexels-photo-21287308.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      categoria: 'Misterio',
      duracion: '2 días',
    },
    {
      nombre: 'Experiencia 3',
      descripcion: 'Observación de auroras boreales desde el espacio exterior.',
      precio: 95075,
      imagen: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=300&h=200&fit=crop',
      categoria: 'Fenómenos',
      duracion: '1 día',
    },
    {
      nombre: 'Experiencia 4',
      descripcion: 'Exploración de nebulosas y nacimiento de nuevas estrellas.',
      precio: 75099,
      imagen: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=300&h=200&fit=crop',
      categoria: 'Naturaleza',
      duracion: '1 día',

    },
    {
      nombre: 'Experiencia 5',
      descripcion: 'Aventura épica en la superficie del planeta Marte en una nave espacial.',
      precio: 250000,
      imagen: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=300&h=200&fit=crop',
      categoria: 'Aventura',
      duracion: '5 días',
    },
    {
      nombre: 'Experiencia 6',
      descripcion: 'Visita a la Estación Espacial Internacional con actividades científicas.',
      precio: 320050,
      imagen: 'https://images.pexels.com/photos/2152/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      categoria: 'Científica',
      duracion: '7 días',
    },
    {
      nombre: 'Experiencia 7',
      descripcion: 'Tour por los anillos de Saturno con vistas espectaculares.',
      precio: 190999,
      imagen: 'https://images.unsplash.com/photo-1457364983758-510f8afa9f5f?w=300&h=200&fit=crop',
      categoria: 'Aventura',
      duracion: '4 días',
    },
    {
      nombre: 'Experiencia 8',
      descripcion: 'Encuentro con meteoros y lluvia de estrellas en tiempo real.',
      precio: 140025,
      imagen: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=300&h=200&fit=crop',
      categoria: 'Científica',
      duracion: '5 días',

    },
    {
      nombre: 'Experiencia 9',
      descripcion: 'Expedición a los confines de la Vía Láctea y más allá en una nave espacial.',
      precio: 450000,
      imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      categoria: 'Astronomía',
      duracion: '10 días',
    }
  ];

  // Método para abrir el modal con el producto seleccionado
  abrirModalDetalle(producto: Producto) {
    this.productoSeleccionado = producto;
    this.mostrarModal = true;
  }

  // Método para cerrar el modal
  cerrarModal() {
    this.mostrarModal = false;
    this.productoSeleccionado = null;
  }

  // Método para comprar/remover el producto
  comprarProducto() {
    if (this.productoSeleccionado) {
      if (this.isProductInCart()) {
        // Si está en el carrito, lo removemos
        const removed = this.cartService.removeByProductName(this.productoSeleccionado.nombre);
        if (removed) {
          this.toastService.info(
            '🗑️ Experiencia Removida',
            `"${this.productoSeleccionado.nombre}" ha sido quitada de tu carrito espacial.`
          );
        }
      } else {
        // Si no está en el carrito, lo agregamos
        const success = this.cartService.addToCart(this.productoSeleccionado);
        if (success) {
          console.log(`Comprando: ${this.productoSeleccionado.nombre}`);
          this.toastService.success(
            '🚀 ¡Experiencia Agregada!',
            `"${this.productoSeleccionado.nombre}" ha sido añadida a tu carrito espacial.`
          );
          this.cerrarModal();
        } else {
          this.toastService.warning(
            '⚠️ Ya en Carrito',
            `La experiencia "${this.productoSeleccionado.nombre}" ya está en tu carrito espacial.`
          );
        }
      }
    }
  }

  // Verificar si el producto ya está en el carrito
  isProductInCart(): boolean {
    if (!this.productoSeleccionado) return false;
    return this.cartService.isInCart(this.productoSeleccionado.nombre);
  }
}
