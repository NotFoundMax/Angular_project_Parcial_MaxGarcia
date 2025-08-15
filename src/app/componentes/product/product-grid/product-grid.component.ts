import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CartService } from '../../../servicios/cart.service';
import { ToastService } from '../../../servicios/toast.service';

// Interfaz para definir la estructura de un producto
interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
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
      precio: 12050,
      imagen: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop'
    },
    {
      nombre: 'Experiencia 2',
      descripcion: 'Caminata lunar con tecnología de gravedad artificial avanzada.',
      precio: 18099,
      imagen: 'https://images.pexels.com/photos/21287308/pexels-photo-21287308.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      nombre: 'Experiencia 3',
      descripcion: 'Observación de auroras boreales desde el espacio exterior.',
      precio: 9575,
      imagen: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=300&h=200&fit=crop'
    },
    {
      nombre: 'Experiencia 4',
      descripcion: 'Exploración de nebulosas y nacimiento de nuevas estrellas.',
      precio: 7599,
      imagen: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=300&h=200&fit=crop'
    },
    {
      nombre: 'Experiencia 5',
      descripcion: 'Aventura épica en la superficie del planeta Marte.',
      precio: 25000,
      imagen: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=300&h=200&fit=crop'
    },
    {
      nombre: 'Experiencia 6',
      descripcion: 'Visita a la Estación Espacial Internacional con actividades científicas.',
      precio: 32050,
      imagen: 'https://images.pexels.com/photos/2152/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      nombre: 'Experiencia 7',
      descripcion: 'Tour por los anillos de Saturno con vistas espectaculares.',
      precio: 19999,
      imagen: 'https://images.unsplash.com/photo-1457364983758-510f8afa9f5f?w=300&h=200&fit=crop'
    },
    {
      nombre: 'Experiencia 8',
      descripcion: 'Encuentro con meteoros y lluvia de estrellas en tiempo real.',
      precio: 14025,
      imagen: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=300&h=200&fit=crop'
    },
    {
      nombre: 'Experiencia 9',
      descripcion: 'Expedición a los confines de la Vía Láctea y más allá.',
      precio: 45000,
      imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop'
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

  // Método para comprar el producto
  comprarProducto() {
    if (this.productoSeleccionado) {
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

  // Verificar si el producto ya está en el carrito
  isProductInCart(): boolean {
    if (!this.productoSeleccionado) return false;
    return this.cartService.isInCart(this.productoSeleccionado.nombre);
  }
}
