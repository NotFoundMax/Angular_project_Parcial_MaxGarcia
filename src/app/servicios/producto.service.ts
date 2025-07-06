import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../modelos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos: Producto[] = [
    { id: 1, nombre: 'Manzanilla', precio: 5, stock: 100 },
    { id: 2, nombre: 'Menta', precio: 6, stock: 80 },
    { id: 3, nombre: 'Eucalipto', precio: 7, stock: 120 }
  ];

  private productosSubject = new BehaviorSubject<Producto[]>(this.productos);

  obtenerProductos(): Observable<Producto[]> {
    return this.productosSubject.asObservable();
  }

  agregarProducto(producto: Producto) {
    this.productos.push(producto);
    this.productosSubject.next(this.productos); // actualiza la lista
  }

  eliminarProducto(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
    this.productosSubject.next(this.productos);
  }
}
