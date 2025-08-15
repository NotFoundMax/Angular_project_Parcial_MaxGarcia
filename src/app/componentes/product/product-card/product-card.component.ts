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
    imagen: ''
  };

  // Emite el evento para abrir el modal
  @Output() abrirModal = new EventEmitter<Producto>();

  constructor(private cartService: CartService) {}

  // Método para manejar el evento de "Ver producto"
  verProducto() {
    this.abrirModal.emit(this.producto);
  }

  // Método para manejar el evento de "Agregar al carrito"
  agregarAlCarrito() {
    const success = this.cartService.addToCart(this.producto);
    if (success) {
      console.log(`Producto ${this.producto.nombre} agregado al carrito`);
    } else {
      alert(`La experiencia "${this.producto.nombre}" ya está en tu carrito espacial.\n\n¡No puedes agregar la misma experiencia dos veces!`);
    }
  }

  // Verificar si el producto ya está en el carrito
  isInCart(): boolean {
    return this.cartService.isInCart(this.producto.nombre);
  }
}
