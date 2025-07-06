import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  // Método para manejar el evento de "Ver producto"
  verProducto() {
    console.log(`Ver detalles del producto: ${this.producto.nombre}`);
  }

  // Método para manejar el evento de "Agregar al carrito"
  agregarAlCarrito() {
    console.log(`Producto ${this.producto.nombre} agregado al carrito`);
  }
}