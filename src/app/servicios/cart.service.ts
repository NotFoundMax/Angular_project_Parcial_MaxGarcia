import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private cartCount = new BehaviorSubject<number>(0);

  cartItems$ = this.cartItems.asObservable();
  cartCount$ = this.cartCount.asObservable();

  constructor() { }

  // Agregar producto al carrito (sin duplicados)
  addToCart(producto: any): boolean {
    const currentItems = this.cartItems.value;
    
    // Verificar si el producto ya existe
    const existingItem = currentItems.find(item => item.nombre === producto.nombre);
    
    if (existingItem) {
      // No se puede agregar el mismo tipo de experiencia
      return false;
    }

    // Crear nuevo item del carrito
    const newItem: CartItem = {
      id: this.generateId(),
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    };

    const updatedItems = [...currentItems, newItem];
    this.cartItems.next(updatedItems);
    this.updateCartCount();
    return true;
  }

  // Remover producto del carrito
  removeFromCart(itemId: string): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    this.cartItems.next(updatedItems);
    this.updateCartCount();
  }

  // Obtener todos los items del carrito
  getCartItems(): CartItem[] {
    return this.cartItems.value;
  }

  // Obtener cantidad total de items
  getCartCount(): number {
    return this.cartCount.value;
  }

  // Calcular total del carrito
  getCartTotal(): number {
    return this.cartItems.value.reduce((total, item) => {
      return total + (item.precio * item.cantidad);
    }, 0);
  }

  // Limpiar carrito
  clearCart(): void {
    this.cartItems.next([]);
    this.updateCartCount();
  }

  // Verificar si un producto ya está en el carrito
  isInCart(productName: string): boolean {
    return this.cartItems.value.some(item => item.nombre === productName);
  }

  private updateCartCount(): void {
    const count = this.cartItems.value.length;
    this.cartCount.next(count);
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}
