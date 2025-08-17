import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ExperienciaEspacial } from 'src/app/interfaces/producto.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  // Propiedad de entrada para recibir los datos del producto
  @Input() producto: ExperienciaEspacial = {
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: '',
    categoria: '',
    duracion: ''
  };

  // Emite el evento para abrir el modal
  @Output() abrirModal = new EventEmitter<ExperienciaEspacial>();

  constructor(
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  // Método para manejar el evento de "Ver producto"
  verProducto() {
    this.abrirModal.emit(this.producto);
  }

  // Agregar o quitar producto del carrito
  agregarAlCarrito() {
    // Verificar si el producto ya está en el carrito
    const productoYaEstaEnCarrito = this.isInCart();

    if (productoYaEstaEnCarrito) {
      // Quitar del carrito
      this.quitarDelCarrito();
    } else {
      // Agregar al carrito
      this.añadirAlCarrito();
    }
  }

  // Quitar producto del carrito
  private quitarDelCarrito() {
    const seQuito = this.cartService.removeByProductName(this.producto.nombre);
    if (seQuito) {
      this.toastService.info(
        '🗑️ Experiencia Removida',
        `"${this.producto.nombre}" ha sido quitada de tu carrito espacial.`
      );
    }
  }

  // Añadir producto al carrito
  private añadirAlCarrito() {
    const seAñadio = this.cartService.addToCart(this.producto);
    if (seAñadio) {
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

  // Verificar si el producto ya está en el carrito
  isInCart(): boolean {
    return this.cartService.isInCart(this.producto.nombre);
  }
}
