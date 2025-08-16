// Componente para mostrar la tabla de productos con acciones
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductoService } from '../../../../core/services/products.service';
import { AuthService } from '../../../../auth/auth.service';
import { UserRole } from '../../../../interfaces/user-role.enum';
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

export class TablaProductoComponent implements OnInit, OnDestroy{

  productos: Producto[] = [];
  cargando: boolean = true;
  error: string | null = null;
  private subscription: Subscription | null = null;

  constructor(
    private productoService: ProductoService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscription = this.productoService.getProductos().subscribe({
      next: (data: any[]) => {
        // Mapear datos de la API a nuestro modelo
        this.productos = data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          price: item.price,
          count: item.rating?.count || 0, // Stock desde rating.count
          image: item.image
        }));
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar productos';
        this.cargando = false;
        console.error(err);
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  // Verificar si el usuario puede editar productos (solo admin y manager)
  puedeEditarProductos(): boolean {
    return this.authService.hasAnyRole([UserRole.ADMINISTRADOR, UserRole.MANAGER]);
  }

  // Verificar si el usuario es solo de ventas
  esUsuarioVentas(): boolean {
    return this.authService.hasRole(UserRole.VENTAS) &&
           !this.authService.hasAnyRole([UserRole.ADMINISTRADOR, UserRole.MANAGER]);
  }
  

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
    if (!this.puedeEditarProductos()) {
      Swal.fire('Acceso denegado', 'No tienes permisos para crear productos', 'warning');
      return;
    }
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
    if (!this.puedeEditarProductos()) {
      Swal.fire('Acceso denegado', 'No tienes permisos para editar productos', 'warning');
      return;
    }
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
    if (!this.puedeEditarProductos()) {
      Swal.fire('Acceso denegado', 'No tienes permisos para eliminar productos', 'warning');
      return;
    }
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
