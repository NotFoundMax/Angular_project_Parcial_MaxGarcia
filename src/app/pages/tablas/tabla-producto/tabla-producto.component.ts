// Componente para mostrar la tabla de productos con acciones
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

export interface Producto {
  id: number;
  title: string;
  description: string;
  price: number;
  count: number;
  image: string;
}

@Component({
  selector: 'app-tabla-producto',
  templateUrl: './tabla-producto.component.html',
  styleUrls: ['./tabla-producto.component.css']
})
export class TablaProductoComponent {

  // Lista de productos de ejemplo
  productos: Producto[] = [
    {
      id: 1,
      title: 'Producto 1',
      description: 'Descripción del producto 1',
      price: 100,
      count: 10,
      image: 'https://via.placeholder.com/50'
    },
    {
      id: 2,
      title: 'Producto 2',
      description: 'Descripción del producto 2',
      price: 200,
      count: 5,
      image: 'https://via.placeholder.com/50'
    }
  ];

  // Variables para los modales
  mostrarModalVer = false;
  mostrarModalEditar = false;
  mostrarModalCrear = false;

  nuevoProducto: Producto = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    count: 0,
    image: ''
  };

  productoSeleccionado: Producto | null = null;

  productoEditando: Producto = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    count: 0,
    image: ''
  };

  // Abrir modal de crear producto
  abrirModalCrear() {
    const maxId = this.productos.length > 0 ? Math.max(...this.productos.map(p => p.id)) : 0;
    this.nuevoProducto = {
      id: maxId + 1,
      title: '',
      description: '',
      price: 0,
      count: 0,
      image: ''
    };
    this.mostrarModalCrear = true;
  }

  // Guardar nuevo producto
  guardarNuevoProducto() {
    this.productos.push({ ...this.nuevoProducto });
    this.mostrarModalCrear = false;
  }

  // Cancelar creación
  cancelarNuevoProducto() {
    this.mostrarModalCrear = false;
  }

  // Abrir modal de ver
  verProducto(producto: Producto) {
    this.productoSeleccionado = producto;
    this.mostrarModalVer = true;
  }

  // Cerrar modal de ver
  cerrarModalVer() {
    this.mostrarModalVer = false;
    this.productoSeleccionado = null;
  }

  // Abrir modal de editar
  editarProducto(producto: Producto) {
    this.productoEditando = { ...producto };
    this.mostrarModalEditar = true;
  }

  // Guardar cambios y cerrar modal de editar
  guardarEdicion() {
    this.productos = this.productos.map(p =>
      p.id === this.productoEditando.id ? { ...this.productoEditando } : p
    );
    this.mostrarModalEditar = false;
  }

  // Cerrar modal de editar
  cerrarModalEditar() {
    this.mostrarModalEditar = false;
  }

  // Confirmar borrado con SweetAlert2
  borrarProducto(producto: Producto) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas borrar el producto "${producto.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productos = this.productos.filter(p => p.id !== producto.id);
        Swal.fire('¡Borrado!', 'El producto ha sido eliminado.', 'success');
      }
    });
  }
}
