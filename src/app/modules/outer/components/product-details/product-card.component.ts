import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../servicios/cart.service';
import { ToastService } from '../../../servicios/toast.service';

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
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  // Propiedad de entrada para recibir los datos del producto
  @Input() producto: Producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: '',
    categoria: '',
    duracion: ''
  };

  // Emite el evento para abrir el modal
  @Output() abrirModal = new EventEmitter<Producto>();

  constructor(
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  // Método para manejar el evento de "Ver producto"
  verProducto() {
    this.abrirModal.emit(this.producto);
  }

  // Método para manejar el evento de "Agregar/Quitar del carrito"
  agregarAlCarrito() {
    if (this.isInCart()) {
      // Si está en el carrito, lo removemos
      const removed = this.cartService.removeByProductName(this.producto.nombre);
      if (removed) {
        this.toastService.info(
          '🗑️ Experiencia Removida',
          `"${this.producto.nombre}" ha sido quitada de tu carrito espacial.`
        );
      }
    } else {
      // Si no está en el carrito, lo agregamos
      const success = this.cartService.addToCart(this.producto);
      if (success) {
        this.toastService.success(
          '🚀 ¡Experiencia Agregada!',
          `"${this.producto.nombre}" ha sido añadida a tu carrito espacial.`
        );
      } else {
        this.toastService.warning(
          '⚠️ Ya en Carrito',
          `La experiencia "${this.producto.nombre}" ya está en tu carrito espacial.`
        );
      }
    }
  }

  // Verificar si el producto ya está en el carrito
  isInCart(): boolean {
    return this.cartService.isInCart(this.producto.nombre);
  }
}
