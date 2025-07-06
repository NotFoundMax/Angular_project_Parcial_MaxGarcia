import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';

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
  // Lista de productos de ejemplo
  productos: Producto[] = [
    {
      nombre: 'Producto 1',
      descripcion: 'Descripción breve del producto 1 para mostrar en la tarjeta.',
      precio: 29.99,
      imagen: 'https://picsum.photos/300/200?random=1'
    },
    {
      nombre: 'Producto 2',
      descripcion: 'Descripción breve del producto 2 para mostrar en la tarjeta.',
      precio: 39.99,
      imagen: 'https://picsum.photos/300/200?random=2'
    },
    {
      nombre: 'Producto 3',
      descripcion: 'Descripción breve del producto 3 para mostrar en la tarjeta.',
      precio: 49.99,
      imagen: 'https://picsum.photos/300/200?random=3'
    },
    {
      nombre: 'Producto 4',
      descripcion: 'Descripción breve del producto 4 para mostrar en la tarjeta.',
      precio: 19.99,
      imagen: 'https://picsum.photos/300/200?random=4'
    },
    {
      nombre: 'Producto 5',
      descripcion: 'Descripción breve del producto 5 para mostrar en la tarjeta.',
      precio: 59.99,
      imagen: 'https://picsum.photos/300/200?random=5'
    },
    {
      nombre: 'Producto 6',
      descripcion: 'Descripción breve del producto 6 para mostrar en la tarjeta.',
      precio: 69.99,
      imagen: 'https://picsum.photos/300/200?random=6'
    },
    {
      nombre: 'Producto 7',
      descripcion: 'Descripción breve del producto 7 para mostrar en la tarjeta.',
      precio: 79.99,
      imagen: 'https://picsum.photos/300/200?random=7'
    },
    {
      nombre: 'Producto 8',
      descripcion: 'Descripción breve del producto 8 para mostrar en la tarjeta.',
      precio: 89.99,
      imagen: 'https://picsum.photos/300/200?random=8'
    },
    {
      nombre: 'Producto 9',
      descripcion: 'Descripción breve del producto 9 para mostrar en la tarjeta.',
      precio: 99.99,
      imagen: 'https://picsum.photos/300/200?random=9'
    }
  ];
}