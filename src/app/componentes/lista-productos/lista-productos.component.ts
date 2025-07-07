import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductoService} from '../../servicios/producto.service';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/modelos/producto.model';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  cargando: boolean = true;
  error: string | null = null;
  private subscription: Subscription | null = null;

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.subscription = this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
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
}
